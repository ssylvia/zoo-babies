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
  _mobile = false,
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

  if (has('touch')){
    $('body').addClass('touch');
    if ($('body').width() < 768){
      _mobile = true;
    }
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
    appReady();
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
    map.on('select',function(animal){
      changeAnimal(animal);
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

    info.on('changed', function(animal){
      changeAnimal(animal);
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
      selectBulletSelector(animal);
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
    if (_mobile || ready){
      addEvents();
      Helper.removeLoadScreen();
    }
  }

  function addEvents()
  {
    $('.map-toggle-wrapper').click(toggleElementClasses);
  }

  function toggleElementClasses()
  {
    if (!$(this).hasClass('active')){
      $('.zoo, .boundary').not('#animal-selector').toggleClass('active');
      $('#animal-selector, #side-pane').toggleClass('zoo wild');
    }
  }

  function createAnimalSelectors()
  {
    var i = 1;
    for (var obj in configOptions.animals){
      if (configOptions.animals.hasOwnProperty(obj)) {

        var htmlString = '\
          <div class="selector-wrapper ' + obj + (i === 1 ? ' active' : '') + '" data-animal="' + obj + '">\
            <div class="selection-arrow"></div>\
            <div class="selector zoo" style="background-image: url(resources/images/mapMarkers/orange/dark/' + obj + '.png)"></div>\
            <div class="selector wild" style="background-image: url(resources/images/mapMarkers/green/dark/' + obj + '.png)"></div>\
          </div>';

        $('#animal-selector').append(htmlString);

        i++;

      }
    }

    $('#animal-selector .selector-wrapper').click(function(){
      changeAnimal($(this).attr('data-animal'));
    });
  }

  function selectBulletSelector(animal)
  {
    $('#animal-selector .selector-wrapper').removeClass('active');
    $('#animal-selector .selector-wrapper.' + animal).addClass('active');
  }

  return {
    init: init
  };

});