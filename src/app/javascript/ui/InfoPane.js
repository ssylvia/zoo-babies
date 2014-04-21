define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'storymaps/core/Data',
  'jquery/jquery',
  'lib/unslider/src/unslider',
  'lib/waitForImages/dist/jquery.waitforimages.min'],
  function(Evented,
    declare,
    langs,
    on,
    array,
    configOptions,
    jquery,
    unslider,
    waitForImages){

    var InfoPane = declare(Evented,{

      animal: null,
      infoPanes: {},
      currentPane: null,
      prevPane: null,

      constructor: function(options){

        declare.safeMixin(this,options);

      },

      changePane: function(animal){
        if(this.currentPane){
          this.currentPane.imageSlider.data().unslider.stop();
        }
        if (this.infoPanes[animal]){
          this.prevPane = this.currentPane;
          this.currentPane = this.infoPanes[animal];

          if(this.prevPane && this.prevPane.elementObj){
            this.prevPane.elementObj.removeClass('active');
          }
          this.currentPane.elementObj.addClass('active');
          this.currentPane.imageSlider.data().unslider.play();
        }
        else{
          this.readyState = {
            images: false
          };
          this.prevPane = this.currentPane;
          this.currentPane = createNewPane(this,animal);
        }
      },

      checkLoadState: function()
      {
        var ready = true;
        for (var i in this.readyState){
          if (!this.readyState[i]){
            ready = false;
          }
        }
        if (ready){
          this.emit('loaded',this.currentPane);

          if(this.prevPane && this.prevPane.elementObj){
            this.prevPane.elementObj.removeClass('active');
          }
          this.currentPane.elementObj.addClass('active');
          this.currentPane.imageSlider.data().unslider.play();
        }
      }

    });

    function createNewPane(self,animal)
    {
      var elementObj = buildHtml(animal);
      var imageSlider = buildImageGallery(self,elementObj,animal);
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
            <h6 class="birthday-text"><strong>Birthday: </strong>' + dataObj.birthday + '</h6>\
            <p class="descriptive-text">' + dataObj.text + '</p>\
          </div>\
        </div>';

      var elementObj = $(htmlString);
      $('#side-pane').append(elementObj);

      return elementObj;
    }

    function buildImageGallery(self,elementObj,animal)
    {
      var images = configOptions.animals[animal].images;

      array.forEach(images,function(img){
        elementObj.find('.image-slider ul').append('<li class="image-slide" style="background-image: url(' + img + ');"></li>');
      });

      elementObj.find('.image-slider').waitForImages({
        finished: function(){
          self.readyState.images = true;
          self.checkLoadState();
        },
        waitForAll: true
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

        slider.data().unslider.stop();
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