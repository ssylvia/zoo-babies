define(["dojo/Evented",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "esri/arcgis/utils"],
  function(Evented,
    declare,
    langs,
    on,
    arcgisUtils){

    var Map = declare([Evented],{

      webmapId: null,
      element: "map",
      geometryServiceURL: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",

      constructor: function(options){

        declare.safeMixin(this,options);

        this.createMap();
      },

      createMap: function(){
        var deferred = arcgisUtils.createMap(this.webmapId,this.element,{
          mapOptions: {
            sliderPosition: "top-right"
          },
          geometryServiceURL: this.geometryServiceURL
        });

        var self = this;

        deferred.then(function(response){
          var map = response.map;

          on.once(map,"update-end",function(){
            self.onMapReady();
          });
        });
      },

      onMapReady: function(){
        this.emit("loaded",{});
      }

    });

    return Map;

});