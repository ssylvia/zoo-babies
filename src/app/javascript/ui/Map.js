define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'esri/arcgis/utils'],
  function(Evented,
    declare,
    langs,
    on,
    array,
    arcgisUtils){

    var Map = declare([Evented],{

      webmapId: null,
      element: 'map',
      geometryServiceURL: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
      animalLayer: null,

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

          selectAnimalLayer(self,map);

          on.once(map,'update-end',function(){
            self.onMapReady();
          });
        });
      },

      onMapReady: function(){
        this.emit('loaded',{});
      }

    });

    function selectAnimalLayer(self,map)
    {
      array.forEach(map.layerIds,function(lyr){
        if(lyr.toLowerCase().search('zoo') >= 0){
          self.animalLayer = map.getLayer(lyr);
        }
      });
    }

    return Map;

});