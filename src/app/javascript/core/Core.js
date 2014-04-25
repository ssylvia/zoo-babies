define(['storymaps/utils/Helper',
  'storymaps/core/Data',
  'storymaps/ui/Map',
  'storymaps/ui/InfoPane',
  'esri/tasks/GeometryService',
  'dojo/on',
  'dojo/has',
  'dojo/touch',
  'lib/bigscreen/bigscreen'],
  function(Helper,
    configOptions,
    Map,
    InfoPane,
    GeometryService,
    on,
    has,
    touch){

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
  _zooMap,
  _boundaryMap,
  _currentAnimal;

  if (_embed){
    $('body').addClass('embed');

    $('#fullscreen-button').click(function(){
      if (BigScreen.enabled) {
        BigScreen.toggle();
      }
      else {
        window.open(self.location.href);
      }
    });
  }

  if (has(touch)){
    $('body').addClass('touch');
  }

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

  function init()
  {
    createAnimalSelectors();
    loadMap(configOptions.zooMap);
    loadInfo();
  }

  function loadMap(mapOptions)
  {
    var map = new Map(mapOptions);
    map.on('loaded',function(){
      _readyState.map++;
      appReady();

      if (mapOptions === configOptions.zooMap){
        loadMap(configOptions.boundaryMap);
        _zooMap.selectAnimal(_currentAnimal);
      }
      else{
        _boundaryMap.selectAnimal(_currentAnimal);
      }
    });

    if (mapOptions.element === 'zoo-map'){
      _zooMap = map;
    }
    else{
      _boundaryMap = map;
    }
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
    if (_currentAnimal != animal){
      _currentAnimal = animal;
      _infoPane.changePane(animal);
      if (_zooMap){
        _zooMap.selectAnimal(animal);
      }
      if (_boundaryMap){
        _boundaryMap.selectAnimal(animal);
      }

    }
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
      $('.zoo, .boundary').not('#animal-selector').toggleClass('active');
      $('#animal-selector').toggleClass('zoo boundary');
    }
  }

  function createAnimalSelectors()
  {
    var i = 1;
    for (var obj in configOptions.animals){
      if (configOptions.animals.hasOwnProperty(obj)) {

        configOptions.animals[obj].slideIndex = i - 1;

        var htmlString = '\
          <div class="selector-wrapper ' + obj + (i === 1 ? ' active' : '') + '" data-animal="' + obj + '">\
            <div class="selection-arrow"></div>\
            <div class="selector">' + i + '</div>\
          </div>';

        $('#animal-selector').append(htmlString);

        i++;

      }
    }

    $('#animal-selector .selector-wrapper').click(function(){
      $('#animal-selector .selector-wrapper').removeClass('active');
      $(this).addClass('active');
      changeAnimal($(this).attr('data-animal'));
    });
  }

  return {
    init: init
  };

});