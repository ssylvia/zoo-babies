define(["dojo/Evented",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "jquery/jquery",
  "/bower_components/unslider/src/unslider.js"],
  function(Evented,
    declare,
    langs,
    array,
    jquery,
    unslider){

    var InfoPane = declare(null,{

      animal: null,

      constructor: function(options){

        declare.safeMixin(this,options);

        this.buildHtml(this.animal);

      },

      buildHtml: function(animal){
        var htmlString = '\
          <div class="InfoPane ' + animal.species + '">\
            <div class="slider-wrapper">\
              <div class="image-slider">\
                <ul></ul>\
              </div>\
            </div>\
            <div class="text-content">\
              <h3 class="species-text">' + animal.species + '</h3>\
              <h6 class="name-text"><strong>Name: </strong>' + animal.name + '</h6>\
              <h6 class="birthday-text"><strong>Birthday: </strong>' + animal.birthday + '</h6>\
              <p class="descriptive-text">' + animal.text + '</p>\
            </div>\
          </div>';

        var infoPane = $(htmlString);
        $("#side-pane").append(infoPane);

        this.buildImageGallery(infoPane,animal.images);
      },

      buildImageGallery: function(infoPane,images){

        array.forEach(images,function(img){
          infoPane.find(".image-slider ul").append('<li class="image-slide" style="background-image: url(' + img + ');"></li>');
        });

        this.slider = infoPane.find(".image-slider").unslider({
          dots: true
        });

        var sideWidth = $("#side-pane").width() - 50;

        $(".slider-wrapper, .image-slider, .image-slide").css({
          "height": sideWidth * (2/3),
          "width": sideWidth
        });
      }

    });

    return InfoPane;

});