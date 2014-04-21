define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'esri/arcgis/utils',
  'esri/tasks/query'],
  function(Evented,
    declare,
    langs,
    on,
    array,
    arcgisUtils,
    Query){

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
        var deferred = arcgisUtils.createMap(this.webmapId,this.element,{
          mapOptions: {
            sliderPosition: 'top-right'
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

        if (this.element === 'zoo-map'){
          var query = new Query();
          query.returnGeometry = true;
          // // query.where =
          // this.animalLayer.queryFeatures(query,function(results){

          // });
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