define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'esri/arcgis/utils',
  'esri/tasks/query',
  'storymaps/utils/MultiTips',
  'storymaps/core/Data'],
  function(Evented,
    declare,
    langs,
    on,
    array,
    arcgisUtils,
    Query,
    MultiTip,
    configOptions){

    var Map = declare([Evented],{

      webmapId: null,
      element: 'map',
      geometryServiceURL: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
      boundaryLayers: {},

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

          on.once(map,'update-end',function(){
            self.onMapReady();
          });
        });
      },

      selectAnimal: function(animal){

        if (this.animalLayer && this.element === 'zoo-map'){
          var query = new Query();
          var self = this;
          query.returnGeometry = true;
          query.where = 'Animal = \'' + animal + '\'';
          console.log(self.map);
          self.animalLayer.queryFeatures(query,function(results){
            self.multiTips = new MultiTip({
              map: self.map,
              content: configOptions.animals[animal].species,
              backgroundColor: '#444',
              borderColor: '#444',
              pointerColor: '#444',
              pointArray: results.features,
              mapAuthorizedWidth: -1,
              mapAuthorizedHeight: -1,
              topLeftNotAuthorizedArea: [40, 180]
            });
          });
        }
        else if (this.element === 'boundary-map' && this.boundaryLayers[animal]){
          this.boundaryLayers.centroid.setDefinitionExpression('animal NOT LIKE \'' + animal + '\'');
          if (this.currentLayer){
            this.currentLayer.hide();
          }
          this.currentLayer = this.boundaryLayers[animal];
          this.currentLayer.show();
          this.map.setExtent(this.currentLayer.initialExtent,true);
        }

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

    return Map;

});