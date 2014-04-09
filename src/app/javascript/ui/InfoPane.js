define(["dojo/Evented",
  "dojo/_base/declare",
  "dojo/_base/lang"],
  function(Evented,
    declare,
    langs){

    var InfoPane = declare(null,{

      constructor: function(options){

        declare.safeMixin(this,options);

      }

    });

    return InfoPane;

});