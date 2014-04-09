define(['storymaps/utils/Helper',
  'storymaps/core/Data',
  'storymaps/ui/Map',
  "esri/tasks/GeometryService",
  "dojo/on"],
  function(Helper,
    configOptions,
    Map,
    GeometryService,
    on){

  /**
   * Core
   * @class Core
   */

  var _embed = (top != self) ? true : false,
  _readyState = {
    map: false
  }

  function init()
  {
    Helper.enableRegionLayout();

    if (configOptions.sharingUrl && location.protocol === "https:"){
      configOptions.sharingUrl = configOptions.sharingUrl.replace('http:', 'https:');
    }

    if (configOptions.geometryServiceUrl && location.protocol === "https:"){
      configOptions.geometryServiceUrl = configOptions.geometryServiceUrl.replace('http:', 'https:');
    }

    esri.arcgis.utils.arcgisUrl = configOptions.sharingUrl;
    esri.config.defaults.io.proxyUrl = configOptions.proxyUrl;
    esri.config.defaults.geometryServiceUrl = new GeometryService(configOptions.geometryServiceUrl);

    loadMap();
  }

  function loadMap()
  {
    var map = new Map({
      webmapId: configOptions.webmap,
      element: "boundary-map"
    });
    map.on("ready",function(){
      _readyState.map = true;
      appReady();
    });
  }

  function appReady()
  {
    var ready = true;
    for (var i in _readyState){
      if (!_readyState[i]){
        ready = false;
      }
    }
    if (ready){
      Helper.removeLoadScreen();
    }
  }

  return {
    init: init
  }

});