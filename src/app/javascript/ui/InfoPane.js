define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'storymaps/core/Data',
  'jquery/jquery',
  'lib/unslider/src/unslider'],
  function(Evented,
    declare,
    langs,
    array,
    configOptions,
    jquery,
    unslider){

    var InfoPane = declare(null,{

      animal: null,
      infoPanes: {},
      currentPane: null,
      prevPane: null,

      constructor: function(options){

        declare.safeMixin(this,options);

      },

      changePane: function(animal){
        if (this.infoPanes[animal]){
          this.prevPane = this.currentPane;
          this.currentPane = this.infoPanes[animal];
        }
        else{
          this.prevPane = this.currentPane;
          this.currentPane = createNewPane(this,animal);
        }

        if(this.prevPane && this.prevPane.elementObj){
          this.prevPane.elementObj.removeClass('active');
        }
        this.currentPane.elementObj.addClass('active');
      },

    });

    function createNewPane(self,animal)
    {
      var elementObj = buildHtml(animal);
      var imageSlider = buildImageGallery(elementObj,animal);
      var infoPane = {
        elementObj: elementObj,
        imageSlider: imageSlider
      };

      self.infoPanes[animal] = infoPane;

      return infoPane;
    }

    function buildHtml(animal){
      var dataObj = configOptions.animals[animal];
      var htmlString = '\
        <div class="info-pane ' + dataObj.species + '">\
          <div class="slider-wrapper">\
            <i class="slide-nav prev-slide icon-left-open"></i>\
            <i class="slide-nav next-slide icon-right-open"></i>\
            <div class="image-slider">\
              <ul></ul>\
            </div>\
          </div>\
          <div class="text-content">\
            <h3 class="species-text">' + dataObj.species + '</h3>\
            <h6 class="name-text"><strong>Name: </strong>' + dataObj.name + '</h6>\
            <h6 class="birthday-text"><strong>Birthday: </strong>' + dataObj.birthday + '</h6>\
            <p class="descriptive-text">' + dataObj.text + '</p>\
          </div>\
        </div>';

      var elementObj = $(htmlString);
      $('#side-pane').append(elementObj);

      return elementObj;
    }

    function buildImageGallery(elementObj,animal)
    {
      var images = configOptions.animals[animal].images;

      array.forEach(images,function(img){
        elementObj.find('.image-slider ul').append('<li class="image-slide" style="background-image: url(' + img + ');"></li>');
      });

      var slider = elementObj.find('.image-slider').unslider({
        dots: images.length > 1 ? true : false
      });

      if(images.length > 1){
        elementObj.find('.slide-nav').show();
        var slidePrev = elementObj.find('.prev-slide');
        var slideNext = elementObj.find('.next-slide');

        slidePrev.click(function(){
          slider.data().unslider.prev();
        });

        slideNext.click(function(){
          slider.data().unslider.next();
        });
      }

      var sideWidth = $('#side-pane').width() - 50;

      $('.slider-wrapper, .image-slider, .image-slide').css({
        'height': sideWidth * (2/3),
        'width': sideWidth
      });

      return slider;
    }

    return InfoPane;

});