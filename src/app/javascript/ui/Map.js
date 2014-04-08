define(
  ["dojo/Evented",
  "dojo/_base/declare",
  "dojo/_base/lang"],
  function(Evented,declare,
    lang){

    var Map = declare(null,{

      webmapId: null,

      constructor: function(options){
        this.webmapId = options.webmapId
      }

    });

});