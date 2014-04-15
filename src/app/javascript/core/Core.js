define(['storymaps/utils/Helper',
  'storymaps/core/Data',
  'storymaps/ui/Map',
  'storymaps/ui/InfoPane',
  'esri/tasks/GeometryService',
  'dojo/on'],
  function(Helper,
    configOptions,
    Map,
    InfoPane,
    GeometryService,
    on){

  /**
   * Core
   * @class Core
   */

  var _embed = (top != self) ? true : false,
  _readyState = {
    map: false
  };

  function init()
  {
    Helper.enableRegionLayout();

    if (configOptions.sharingUrl && location.protocol === 'https:'){
      configOptions.sharingUrl = configOptions.sharingUrl.replace('http:', 'https:');
    }

    if (configOptions.geometryServiceUrl && location.protocol === 'https:'){
      configOptions.geometryServiceUrl = configOptions.geometryServiceUrl.replace('http:', 'https:');
    }

    esri.arcgis.utils.arcgisUrl = configOptions.sharingUrl;
    esri.config.defaults.io.proxyUrl = configOptions.proxyUrl;
    esri.config.defaults.geometryServiceUrl = new GeometryService(configOptions.geometryServiceUrl);

    loadMap(configOptions.zooMap);
    loadInfo('cheetah');

    if(_embed){
      console.log(_embed);
    }
  }

  function loadMap(mapOptions)
  {
    var map = new Map(mapOptions);
    map.on('loaded',function(){
      _readyState.map = true;
      appReady();
    });
  }

  function loadInfo(animal)
  {
    var info = new InfoPane({
      animal: configOptions.animals[animal]
    });
    console.log(info);
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
  };

});