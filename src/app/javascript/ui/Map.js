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
  'esri/renderers/UniqueValueRenderer',
  'dojo/_base/sniff'],
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
            sliderPosition: 'top-right',
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
        var layer;
        var attr;
        if (self.animalLayer && self.element === 'zoo-map'){
          layer = self.animalLayer;
          attr = 'Animal';
        }
        else if (self.boundaryLayers && self.boundaryLayers.centroid && self.element === 'boundary-map'){
          layer = self.boundaryLayers.centroid;
          attr = 'animal';
        }

        if(layer){
          on(layer,'click',function(event){
            if (self.readyForChange){
              self.emit('select',event.graphic.attributes[attr]);
            }
          });

          on(layer,'mouse-over',function(event){
            if (self.readyForChange){
              self.map.setCursor('pointer');
              if (!has('touch') && event.graphic.attributes[attr] != self.currentAnimal.attributes[attr]){
                applyMultiTips(self,event.graphic);
              }
            }
          });

          on(layer,'mouse-out',function(event){
            if (self.readyForChange){
              self.map.setCursor('default');
              if (!has('touch') && event.graphic.attributes[attr] != self.currentAnimal.attributes[attr]){
                 applyMultiTips(self);
              }
            }

          });

        }
      },

      selectAnimal: function(animal){
        var self = this,
          layer = selectLayerIfReady(self),
          animalAttr = 'animal',
          iconColor = 'green';
          self.currentAnimalStr = animal;

        if (self.element === 'zoo-map'){
          animalAttr = 'Animal';
          iconColor = 'orange';
        }

        if (layer){
          var query = new Query();
          self.readyForChange = false;
          query.returnGeometry = true;
          query.where = animalAttr + ' = \'' + animal + '\'';
          query.outFields = '[*]';

          layer.queryFeatures(query,function(results){
            self.currentAnimal = results.features[0];
            self.readyForChange = true;

            on.once('extent-change',function(){
              applyMultiTips(self);
            });

            if($('#' + self.map.container.id).hasClass('active')){
              if (!has('ie') && self.currentAnimal.getDojoShape()){
                self.currentAnimal.getDojoShape().moveToFront();
              }
            }

            var defaultSymbol = new PictureMarkerSymbol('resources/images/mapMarkers/' + iconColor + '/light/anemones.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
            var renderer = new UniqueValueRenderer(defaultSymbol, animalAttr);
            var symbol;

            for (var obj in configOptions.animals){
              if (configOptions.animals.hasOwnProperty(obj)) {
                if (obj === animal){
                  symbol = new PictureMarkerSymbol('resources/images/mapMarkers/' + iconColor + '/dark/' + obj + '.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
                }
                else{
                  symbol = new PictureMarkerSymbol('resources/images/mapMarkers/' + iconColor + '/light/' + obj + '.png', self.markerPosition.width, self.markerPosition.height).setOffset(self.markerPosition.xOffset,self.markerPosition.yOffset);
                }

                renderer.addValue(obj,symbol);
              }
            }

            layer.setRenderer(renderer);
            layer.redraw();

            setMapPosition(self,animal);

          });
        }

      },

      toggleMaps: function(){
        var self = this;
        applyMultiTips(self);
      },

      onMapReady: function(){

        var self = this;

        var homeButton = $('<div class="esriSimpleSliderIncrementButton homeExtentButton"><p class="icon-home"></p></div>');
        $('#' + self.element + ' .esriSimpleSliderIncrementButton').after(homeButton);

        self.emit('loaded',{});

        homeButton.click(function(){
          setMapPosition(self,self.currentAnimalStr);
        });
      }

    });

    function selectLayerIfReady(self)
    {
      var layer = false;

      if (self.animalLayer && self.element === 'zoo-map'){
        layer = self.animalLayer;
      }
      else if (self.element === 'boundary-map' && self.boundaryLayers){
        layer = self.boundaryLayers.centroid;
      }

      return layer;
    }

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
    }

    function applyMultiTips(self,hightlight)
    {
      var pointArray = [self.currentAnimal];
      if($('#' + self.map.container.id).hasClass('active') && !self.multiTips){

        if (hightlight){
          pointArray.push(hightlight);
        }

        self.multiTips = new MultiTip({
          map: self.map,
          backgroundColor: '#444',
          borderColor: '#444',
          pointerColor: '#444',
          offsetTop: 73,
          offsetSide: 3,
          offsetBottom: 0,
          pointArray: pointArray,
          mapAuthorizedWidth: -1,
          mapAuthorizedHeight: -1,
          topLeftNotAuthorizedArea: [40, 180]
        });
      }
      else{
        if (self.multiTips){
          self.multiTips.clean(true);
          self.multiTips = null;
          if ($('#' + self.map.container.id).hasClass('active')){
            applyMultiTips(self,hightlight);
          }
        }
      }
    }

    function setMapPosition(self,animal)
    {
      if (self.element === 'boundary-map'){
        var noHabitat = true;
        for (var lyr in self.boundaryLayers){
          if (self.boundaryLayers.hasOwnProperty(lyr)) {
            if (lyr === animal){
              noHabitat = false;
              self.map.setExtent(self.boundaryLayers[lyr].initialExtent,true);
              self.boundaryLayers[lyr].show();
            }
            else if (lyr != 'centroid'){
              self.boundaryLayers[lyr].hide();
            }
          }
        }
        if (noHabitat){
          positionMap(self.map,self.currentAnimal,4);
        }
      }
      else{
        positionMap(self.map,self.currentAnimal,17);
      }
    }

    function positionMap(map,graphic,zoom)
    {
      if(map && graphic && zoom){
        var pt = graphic.geometry;
        if (pt.type === 'point'){
          map.centerAndZoom(pt,zoom);
        }
      }
    }

    return Map;

});