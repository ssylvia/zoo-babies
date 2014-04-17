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
    map: 0,
    infoPane: 0
  },
  _infoPane,
  _currentAnimal;

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
    loadInfo();

    if(_embed){
      console.log(_embed);
    }

    window.test = changeAnimal;
  }

  function loadMap(mapOptions)
  {
    var map = new Map(mapOptions);
    map.on('loaded',function(){
      _readyState.map++;
      appReady();

      if (mapOptions === configOptions.zooMap){
        loadMap(configOptions.boundaryMap);
      }
    });
  }

  function loadInfo()
  {
    var info = new InfoPane();
    _infoPane = info;

    info.on('loaded',function(){
      _readyState.infoPane++;
      appReady();
    });

    // createFirstPane
    for (var i in configOptions.animals){
      if (configOptions.animals.hasOwnProperty(i)) {
        changeAnimal(i);
        break;
      }
    }
  }

  function changeAnimal(animal)
  {
    _currentAnimal = animal;
    _infoPane.changePane(animal);
  }

  function appReady()
  {
    var ready = true;
    for (var i in _readyState){
      if (_readyState[i] === 0){
        ready = false;
      }
    }
    if (ready){
      addEvents();
      Helper.removeLoadScreen();
    }
  }

  function addEvents()
  {
    $('.map-toggle-wrapper').click(toggleMaps);
  }

  function toggleMaps()
  {
    if (!$(this).hasClass('active')){
      $('.zoo, .boundary').toggleClass('active');
    }
  }

  return {
    init: init
  };

});