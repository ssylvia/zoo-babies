define(['storymaps/utils/Helper',
  'storymaps/core/Data'],
  function(Helper,
    configOptions){

  /**
   * Core
   * @class Core
   */

  var _embed = (top != self) ? true : false;

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