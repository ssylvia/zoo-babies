define(["dojo/Evented",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "esri/map",
  "esri/arcgis/utils"],
  function(Evented,
    declare,
    langs,
    Map,
    arcgisUtils){

    var ZooMap = declare(null,{

      webmapId: null,
      element: "map",
      geometryServiceURL: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",

      constructor: function(options){

        declare.safeMixin(this,options);

        this.createMap();
      },

      createMap: function(){
        arcgisUtils.createMap(this.webmapId,this.element,{
          mapOptions: {
            sliderPosition: "top-right"
          },
          geometryServiceURL: this.geometryServiceURL
        }).then(function(response){
        });
      }

    });

    return ZooMap;

});