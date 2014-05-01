define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/touch',
  'dojo/has',
  'dojo/_base/array',
  'esri/arcgis/utils',
  'esri/tasks/query',
  'storymaps/utils/MultiTips',
  'storymaps/core/Data',
  'esri/symbols/PictureMarkerSymbol',
  'esri/renderers/UniqueValueRenderer'],
  function(Evented,
    declare,
    langs,
    on,
    touch,
    has,
    array,
    arcgisUtils,
    Query,
    MultiTip,
    configOptions,
    PictureMarkerSymbol,
    UniqueValueRenderer){

    var Map = declare([Evented],{

      webmapId: null,
      element: 'map',
      geometryServiceURL: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
      boundaryLayers: {},
      markerPosition: {
        height: 70,
        width: 65,
        xOffset: 7,
        yOffset: 35,
      },
      readyForChange: true,

      constructor: function(options){

        declare.safeMixin(this,options);

        this.createMap();
      },

      createMap: function(){
        var minZoom,maxZoom;
        if(this.element === 'zoo-map'){
          minZoom = 14;
          maxZoom = 18;
        }
        else{
          minZoom = 2;
          maxZoom = 5;
        }
        var deferred = arcgisUtils.createMap(this.webmapId,this.element,{
          mapOptions: {
            sliderPosition: 'top-left',
            minZoom: minZoom,
            maxZoom: maxZoom
          },
          geometryServiceURL: this.geometryServiceURL
        });

        var self = this;

        deferred.then(function(response){
          var map = response.map;
          self.map = map;

          selectAnimalLayer(self,map);
          self.addLayerEvents(self);

          on.once(map,'update-end',function(){
            self.onMapReady();
          });
        });
      },

      addLayerEvents: function(self){
        if (self.animalLayer && self.element === 'zoo-map'){

          on(self.animalLayer,'click',function(event){
            if (self.readyForChange){
              self.emit('select',event.graphic.attributes.Animal);
            }
          });

          on(self.animalLayer,'mouse-over',function(event){
            if (self.readyForChange){
              self.map.setCursor('pointer');
              if (!has('touch') && event.graphic.attributes.Animal != self.currentAnimal.attributes.Animal){
                self.multiTips = new MultiTip({
                  map: self.map,
                  backgroundColor: '#444',
                  borderColor: '#444',
                  pointerColor: '#444',
                  offsetTop: 73,
                  offsetSide: 3,
                  offsetBottom: 0,
                  pointArray: [self.currentAnimal,event.graphic],
                  mapAuthorizedWidth: -1,
                  mapAuthorizedHeight: -1,
                  topLeftNotAuthorizedArea: [40, 180]
                });

              }
            }
          });

          on(self.animalLayer,'mouse-out',function(event){
            if (self.readyForChange){
              self.map.setCursor('default');
              if (!has('touch') && event.graphic.attributes.Animal != self.currentAnimal.attributes.Animal){
                self.multiTips = new MultiTip({
                  map: self.map,
                  backgroundColor: '#444',
                  borderColor: '#444',
                  pointerColor: '#444',
                  offsetTop: 73,
                  offsetSide: 3,
                  offsetBottom: 0,
                  pointArray: [self.currentAnimal],
                  mapAuthorizedWidth: -1,
                  mapAuthorizedHeight: -1,
                  topLeftNotAuthorizedArea: [40, 180]
                });

              }
            }

          });

        }
      },

      selectAnimal: function(animal){

        if (this.animalLayer && this.element === 'zoo-map'){
          var query = new Query();
          var self = this;
          self.readyForChange = false;
          query.returnGeometry = true;
          query.where = 'Animal = \'' + animal + '\'';
          query.outFields = '[*]';
          self.animalLayer.queryFeatures(query,function(results){

            self.currentAnimal = results.features[0];
            positionMap(self.map,results.features[0]);

            on.once(self.map,'extent-change',function(){
              self.readyForChange = true;
              self.multiTips = new MultiTip({
                map: self.map,
                backgroundColor: '#444',
                borderColor: '#444',
                pointerColor: '#444',
                offsetTop: 73,
                offsetSide: 3,
                offsetBottom: 0,
                pointArray: results.features,
                mapAuthorizedWidth: -1,
                mapAuthorizedHeight: -1,
                topLeftNotAuthorizedArea: [40, 180]
              });
            });

          });

          var defaultSymbol = new PictureMarkerSymbol('resources/images/mapMarkers/orange/light/anemones.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
          var renderer = new UniqueValueRenderer(defaultSymbol, 'Animal');

          for (var obj in configOptions.animals){
            if (configOptions.animals.hasOwnProperty(obj)) {
              var symbol;
              if (obj === animal){
                symbol = new PictureMarkerSymbol('resources/images/mapMarkers/orange/dark/' + obj + '.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
              }
              else{
                symbol = new PictureMarkerSymbol('resources/images/mapMarkers/orange/light/' + obj + '.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
              }

              renderer.addValue(obj,symbol);
            }
          }

          this.animalLayer.setRenderer(renderer);
          this.animalLayer.redraw();
        }
        // else if (this.element === 'boundary-map' && this.boundaryLayers[animal]){
        //   this.boundaryLayers.centroid.setDefinitionExpression('animal NOT LIKE \'' + animal + '\'');
        //   if (this.currentLayer){
        //     this.currentLayer.hide();
        //   }
        //   this.currentLayer = this.boundaryLayers[animal];
        //   this.currentLayer.show();
        //   this.map.setExtent(this.currentLayer.initialExtent,true);
        // }

      },

      onMapReady: function(){
        this.emit('loaded',{});
      }

    });

    function selectAnimalLayer(self,map)
    {
      if (self.element === 'boundary-map'){
        array.forEach(map.graphicsLayerIds,function(lyr){
          if(lyr.toLowerCase().search('zoo') >= 0){
            var layer = map.getLayer(lyr);
            self.boundaryLayers[layer.name] = layer;
          }
        });
      }
      else{
        array.forEach(map.graphicsLayerIds,function(lyr){
          if(lyr.toLowerCase().search('zoo') >= 0){
            self.animalLayer = map.getLayer(lyr);
          }
        });
      }
      window.animalLayer = self.animalLayer;
    }

    function positionMap(map,graphic){
      map.centerAt(graphic.geometry);
    }

    return Map;

});