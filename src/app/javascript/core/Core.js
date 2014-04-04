define(['storymaps/utils/Helper'],
  function(Helper){

  function init()
  {
    Helper.enableRegionLayout();



    appReady();
  }

  function appReady()
  {
    Helper.removeLoadScreen();
  }

  return {
    init: init
  }

});