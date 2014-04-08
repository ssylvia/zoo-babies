define(['storymaps/utils/Helper',
  'storymaps/core/Data',
  'storymaps/ui/Map',
  "esri/tasks/GeometryService"],
  function(Helper,
    configOptions,
    Map,
    GeometryService){

  /**
   * Core
   * @class Core
   */

  var _embed = (top != self) ? true : false;

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

    appReady();
  }

  function loadMap()
  {
    var map = new Map({
      webmapId: configOptions.webmap
    });
  }

  function appReady()
  {
    Helper.removeLoadScreen();
  }

  return {
    init: init
  }

});