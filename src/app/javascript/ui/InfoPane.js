define(['dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/has',
  'dojo/touch',
  'dojo/_base/array',
  'storymaps/core/Data',
  'storymaps/utils/Helper',
  'jquery/jquery',
  'lib/unslider/src/unslider',
  'lib/waitForImages/dist/jquery.waitforimages.min',
  'lib/swiper/dist/idangerous.swiper'],
  function(Evented,
    declare,
    langs,
    on,
    has,
    touch,
    array,
    configOptions,
    Helper,
    jquery,
    unslider,
    waitForImages){

    var InfoPane = declare(Evented,{

      animals: [],
      infoPanes: {},
      currentPane: null,
      prevPane: null,
      swiper: $('.swiper-container').swiper({
        mode: 'horizontal',
        useCSS3Transforms: true,
        keyboardControl: true,
      }),
      firstSlide: true,

      constructor: function(options){

        declare.safeMixin(this,options);

        var self = this;

        for (var obj in configOptions.animals){
          if (configOptions.animals.hasOwnProperty(obj)) {
            var animal = {
              animal: obj,
              paneLoaded: false
            };

            this.animals.push(animal);
          }
        }

        addSwiperEvents(self);

      },

      changePane: function(animal){
        if(this.currentPane){
          this.currentPane.imageSlider.data().unslider.stop();
        }
        if (this.infoPanes[animal]){
          this.prevPane = this.currentPane;
          this.currentPane = this.infoPanes[animal];

          this.currentPane.imageSlider.data().unslider.play();
        }
        else{
          this.prevPane = this.currentPane;
          this.currentPane = createNewPane(this,animal);
        }
        loadAdjInfoPane(this,animal);
        this.swiper.swipeTo(this.currentPane.slide.index());
        this.emit('changed',animal);
      }

    });

    function addSwiperEvents(self)
    {
      var swiper = self.swiper;

      swiper.addCallback('SlideChangeEnd',function(swipe){
        var animal = swipe.activeSlide().getData('animal');

        self.changePane(animal);
      });

      swiper.addCallback('SlideChangeStart',function(swipe){
        self.currentPane.imageSlider.data().unslider.stop();
      });
    }

    function createNewPane(self,animal)
    {
      var aryIndex;
      array.forEach(self.animals,function(obj,i){
        if (obj.animal === animal){
          aryIndex = i;
        }
      });
      var slide = buildHtml(self,animal);
      var elementObj = $('.swiper-slide').eq(slide.index());
      var imageSlider = buildImageGallery(self,elementObj,animal);
      var infoPane = {
        arrayIndex: aryIndex,
        slide: slide,
        elementObj: elementObj,
        imageSlider: imageSlider,
        readyState: {
          images: false
        }
      };

      self.infoPanes[animal] = infoPane;
      self.animals[aryIndex].paneLoaded = true;

      return infoPane;
    }

    function buildHtml(self,animal){
      var dataObj = configOptions.animals[animal];
      var htmlString = '\
        <div class="info-pane ' + dataObj.species + '">\
          <div class="slider-wrapper">\
            <i class="slide-nav prev-slide icon-left-open"></i>\
            <i class="slide-nav next-slide icon-right-open"></i>\
            <i class="icon-spin animate-spin"></i>\
            <div class="image-slider">\
              <ul></ul>\
            </div>\
          </div>\
          <p class="photo-credit">Photos courteous of Smithsonian\'s National Zoological Park</p>\
          <div class="text-content">\
            <h3 class="species-text">' + dataObj.species + '</h3>\
            <h6 class="birthday-text"><strong>Birthday: </strong>' + dataObj.birthday + '</h6>\
            <h6 class="status-text"><strong>Red List Status: </strong>' + dataObj.status + '</h6>\
            <h6 class="zoo-text-header mobile-text-header"><strong>At the Zoo</strong></h6>\
            <p class="zoo-text">' + dataObj.zooText + '</p>\
            <h6 class="wild-text-header mobile-text-header"><strong>In the Wild</strong></h6>\
            <p class="wild-text">' + dataObj.wildText + '</p>\
          </div>\
        </div>';

      if (self.firstSlide && has('touch')){
        self.firstSlide = false;

        htmlString = '\
          <div class="info-pane ' + dataObj.species + '">\
            <div class="slider-wrapper">\
              <i class="slide-nav prev-slide icon-left-open"></i>\
              <i class="slide-nav next-slide icon-right-open"></i>\
              <i class="icon-spin animate-spin"></i>\
              <div class="image-slider">\
                <ul></ul>\
              </div>\
            </div>\
            <p class="photo-credit"></p>\
            <div class="text-content">\
              <h3 class="species-text">' + dataObj.species + '</h3>\
              <h6 class="birthday-text"><strong>Birthday: </strong>' + dataObj.birthday + '</h6>\
              <h6 class="status-text"><strong>Red List Status: </strong>' + dataObj.status + '</h6>\
              <h6 class="zoo-text-header mobile-text-header"><strong>At the Zoo</strong></h6>\
              <p class="zoo-text">' + dataObj.zooText + '</p>\
              <h6 class="wild-text-header mobile-text-header"><strong>In the Wild</strong></h6>\
              <p class="wild-text">' + dataObj.wildText + '</p>\
              <h6 class="mobile-instructions"><em>Swipe left to see more zoo babies.</em></h6>\
            </div>\
          </div>';
      }

      var newSlide = self.swiper.createSlide(htmlString,'swiper-slide ' + dataObj.species);
      newSlide.setData('animal',animal);
      newSlide.insertAfter(getSlideIndex(self,animal));

      return newSlide;
    }

    function buildImageGallery(self,elementObj,animal)
    {
      var images = configOptions.animals[animal].images;
      var credits = [];

      array.forEach(images,function(img,i){
        elementObj.find('.image-slider ul').append('<li class="image-slide" style="background-image: url(' + img.url + ');"></li>');
        credits.push(img.credit);
        if (i === 0){
          elementObj.find('.photo-credit').html('Photo by: ' + img.credit);
        }
      });

      elementObj.find('.image-slider').waitForImages({
        finished: function(){
          self.infoPanes[animal].readyState.images = true;
          checkLoadState(self,animal);
        },
        waitForAll: true
      });

      var slider = elementObj.find('.image-slider').unslider({
        dots: images.length > 1 ? true : false,
        delay: 8000,
        complete: function(){
          var currentIndex = slider.data().unslider.i;
          elementObj.find('.photo-credit').html('Photo by: ' + credits[currentIndex]);
        }
      });

      if(images.length > 1){
        elementObj.addClass('multiple-images');
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

      Helper.resetRegionLayout();

      return slider;
    }

    function checkLoadState(self,animal)
    {
      var ready = true;
      for (var obj in self.infoPanes[animal].readyState){
        if (self.infoPanes[animal].readyState.hasOwnProperty(obj) && !self.infoPanes[animal].readyState[obj]) {
          ready = false;
        }
      }
      if (ready){
        self.emit('loaded',this.currentPane);

        self.infoPanes[animal].elementObj.addClass('loaded');
        if (self.infoPanes[animal] === self.currentPane){
          self.currentPane.imageSlider.data().unslider.play();
        }
      }
    }

    function getSlideIndex(self,animal)
    {
      var prevAnimal;
      var index = 0;

      for (var i = 0; i < self.animals.length; i++){
        if (self.animals[i].animal === animal){
          break;
        }
        else if (self.animals[i].paneLoaded){
          prevAnimal = self.animals[i].animal;
        }
      }

      if (prevAnimal){
        index = self.infoPanes[prevAnimal].slide.index();
      }
      return index;
    }

    function loadAdjInfoPane(self,animal)
    {
      var aryIndex = self.currentPane.arrayIndex;
      var next = self.animals[aryIndex + 1];
      var prev = self.animals[aryIndex - 1];
      if (next && !next.paneLoaded){
        createNewPane(self,next.animal);
      }
      if (prev && !prev.paneLoaded){
        createNewPane(self,prev.animal);
      }
    }

    return InfoPane;

});