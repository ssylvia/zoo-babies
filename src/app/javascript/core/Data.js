define([],
  function(){

  /**
   * Data
   * @class Data
   */

  var configOptions = {
    boundaryMap: {
      webmapId: '6062139d42a24ed7841fe42363a841ca',
      element: 'boundary-map'
    },
    zooMap: {
      webmapId: '705c481ee1b542199d341ba31eb72f68',
      element: 'zoo-map'
    },
    proxyUrl: '',
    geometryServiceUrl: 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
    sharingUrl: 'http://www.arcgis.com/sharing/rest/content/items',
    animals: {
      'lion': {
        'species': 'African Lion',
        'birthday': 'Jan. 24, 2014 and March 2, 2014',
        'status': 'Vulnerable',
        'zooText': 'The National Zoo’s 10-year-old lioness Naba gave birth to <a href="http://nationalzoo.si.edu/Animals/GreatCats/Lion/default.cfm" target="_blank">three cubs</a>, two survived and one stillborn, on January 24, 2014. Then on March 4, Naba’s sister, 9-year old lioness, Shera, gave birth to four cubs. Each mom bonds with their cubs for several weeks before they meet their dad—an effort to emulate the time it takes for a lioness to introduce her cubs to their pride in the wild. Naba’s cubs will be on exhibit starting in the early spring.',
        'wildText': 'As the “world’s most social felines,” African lions (<a href="http://animaldiversity.ummz.umich.edu/accounts/Panthera_leo/" target="_blank"><em>Panthera leo</em></a>) are unique among big cats in that they have a complex pride social structure. The International Union for the Conservation of Nature (IUCN) lists them as vulnerable. Lion populations have decreased by about 30 percent over the last 20 years.',
        'images': ['https://farm4.staticflickr.com/3680/12351219724_6a231df8a4_z.jpg','https://farm8.staticflickr.com/7433/12350945363_47c55eba71_z.jpg','https://farm4.staticflickr.com/3782/13380785174_1f8884867c_z.jpg']
      },
      'greySeal': {
        'species': 'Grey Seal',
        'birthday': 'Jan. 22, 2014',
        'status': 'Least Concern',
        'zooText': 'On March 26, 2014, one of the National Zoo’s female gray seals, Kara, <a href="http://nationalzoo.si.edu/Animals/AmericanTrail/News/2014Jan-PupBorn.cfm" target="_blank">gave birth</a> to her second pup, a girl. Kara was having trouble lactating, so keepers and vets stepped in to feed the growing pup. Her dad is the Zoo’s resident male gray seal, Gunther. By now the seal pup has lost her white baby coat, and sports a black spotted silvery coat like that if adult seals. Though not currently visible to the public, she enjoys her own pool behind the seal habitat on the zoo’s American Trail.',
        'wildText': 'In the wild, gray seals (<a href="http://www.nmfs.noaa.gov/pr/species/mammals/pinnipeds/grayseal.htm" target="_blank"><em>Halichoerus grypus</em></a>) were once endangered, though they are now a conservation success story, with numbers increasing in most coastal areas of the United States and Canada.',
        'images': ['https://farm8.staticflickr.com/7359/12236296036_8c65502182_z.jpg','https://farm6.staticflickr.com/5464/13426084754_a3f017d97a_z.jpg','https://farm8.staticflickr.com/7384/13426086394_baf0bcd95e_z.jpg']
      },
      'gazelle': {
        'species': 'Dama Gazelle',
        'birthday': 'Feb. 18-25, 2014',
        'status': 'Critcally Endangered',
        'zooText': 'The National Zoo has three Dama gazelle calves, which were born at the Smithsonian’s Conservation Biology Institute in Front Royal, Virginia, on February 18, 20 and 25 of this year. ',
        'wildText': 'With a wild population of less than 500, Dama gazelles (<a href="http://nationalzoo.si.edu/Animals/AfricanSavanna/Facts/fact-dama.cfm" target="_blank"><em>Gazella dama</em></a>) are the rarest and the largest (reaching up to 4 feet at the shoulder) of the gazelle family. Though they once inhabited all of northern Africa, now this <a href="http://www.iucnredlist.org/details/8968/0" target="_blank">critically endangered</a> species is only found in select grasslands and steppes in Mali, Chad, and Niger. Their coloration varies with age and season, and they eat shrubs, herbs, succulents, trees and other woody plants.',
        'images': ['https://farm3.staticflickr.com/2175/13083134063_a770c99038_z.jpg','https://farm8.staticflickr.com/7415/13083376534_5bf5f0facf_z.jpg','https://farm8.staticflickr.com/7392/13083311244_8b85928f6b_z.jpg']
      },
      'kingFisher': {
        'species': 'Micronesian King Fisher',
        'birthday': 'Jan 1, 2014',
        'status': 'Extinct in the Wild',
        'zooText': 'Though <a href="http://www.smithsonianmag.com/ist/?next=/smithsonian-institution/rare-micronesian-kingfishers-successfully-hatched-78855594/" target="_blank">incredibly hard to breed</a>, the first Micronesian kingfisher chick hatched at the National Zoo in 1998. In January, the zoo received their <a href="http://newsdesk.si.edu/releases/micronesian-kingfisher-chick-hatches-national-zoo-s-conservation-biology-institute" target="_blank">latest addition</a> to the kingfisher flock: a chick of unknown sex, born to an 8-year-old male and 2 year-old female. Officially extinct in the wild, only 129 kingfishers remain in captivity. Visitors can see the rare kingfishers at the zoo’s <a href="http://nationalzoo.si.edu/Animals/Birds/Exhibit/" target="_blank">Bird House</a>.',
        'wildText': 'Like many of Guam’s native bird species, Micronesian kingfishers (<a href="http://nationalzoo.si.edu/SCBI/EndangeredSpecies/MicroKingfisher/" target="_blank"><em>Halcyon cinnamomina cinnamomina</em></a>) suffered from over-predation from <a href="http://www.invasivespeciesinfo.gov/animals/bts.shtml" target="_blank">brown tree snakes</a> (Boiga irregularis), first brought to the island in the 1950s on cargo ships. They are now extinct in the wild.',
        'images': ['https://farm3.staticflickr.com/2820/12121986613_6969a5a42c_z.jpg','https://farm4.staticflickr.com/3677/12122106034_1efaac336d_z.jpg']
      },
      'slothBear': {
        'species': 'Sloth Bear',
        'birthday': 'Dec. 29, 2013',
        'status': 'Vulnerable',
        'zooText': 'On December 29, 2013, one of the National Zoo’s female sloth bears, Khali, gave birth to three cubs. She surprised keepers by consuming two of those cubs, though ingesting cubs in the wild is common and usually means that the mother senses something is wrong with the cub. The third cub is currently being hand-reared by zoo staff. These bears can be seen along the <a href="http://nationalzoo.si.edu/animals/asiatrail/slothbears/" target="_blank">Asia Trail</a>.',
        'wildText': 'Native to India’s forests, sloth bears (<a href="http://nationalzoo.si.edu/animals/asiatrail/slothbears/factsheet.cfm" target="_blank"><em>Melursus ursinus</em></a>) are listed as <a href="http://www.iucnredlist.org/details/13143/0" target="_blank">vulnerable</a> on the IUCN’s Red List. They dine on a mixture of fruit, termites, and ants, depending on the season. Less than 10,000 sloth bears persist in the wild in India, Bhutan, Nepal and Sri Lanka.',
        'images': ['https://farm8.staticflickr.com/7361/9091898223_a5fcb06d98_z.jpg','https://farm3.staticflickr.com/2869/9094117286_050e82c069_z.jpg','https://farm4.staticflickr.com/3757/9091895797_27a1854490_z.jpg']
      },
      'horse': {
        'species': 'Przewalski Horse',
        'birthday': 'Aug. 31, 2013',
        'status': 'Extinct in the Wild',
        'zooText': 'The first Przewalski’s horse (<a href="http://nationalzoo.si.edu/animals/asiatrail/fact-phorse.cfm" target="_blank"><em>Equus ferus ssp. Przewalskii</em></a>) born through <a href="http://nationalzoo.si.edu/scbi/ReproductiveScience/WildEquids/PhorseBreeding.cfm" target="_blank">artificial insemination</a> arrived on July 27, 2013, at the Smithsonian’s Conservation Biology Institute in Front Royal, Virginia. The Zoo’s most recent foal, a female, is 9 months old now and will likely stay with her mother, Anne, for up to two years in a nursery herd before joining SCBI’s main herd at the end of the summer. As keepers begin to train her, they’ve found that she enjoys apple biscuits and belly rubs.',
        'wildText': 'At a little more than 4 feet high, Przewalski’s horses are the only living undomesticated horses, though technically classified as <a href="http://www.iucnredlist.org/details/7961/0" target="_blank">extinct</a> in the wild. They originally inhabited parts of eastern Europe, Russia, Mongolia, and China.',
        'images': ['https://farm4.staticflickr.com/3699/9408984831_afeb46dea6_z.jpg','https://farm3.staticflickr.com/2813/9408982123_dc24647c32_z.jpg','https://farm4.staticflickr.com/3802/9411745468_a2e413e616_z.jpg']
      },
      'panda': {
        'species': 'Giant Panda',
        'birthday': 'Aug. 23, 2013',
        'status': 'Endangered',
        'zooText': 'If you haven’t heard, the National Zoo has a nearly 9-month-old giant panda cub named <a href="http://www.smithsonianmag.com/smithsonian-institution/panda-cub-gets-a-name-bao-bao-180949039/" target="_blank">Bao Bao</a>, or “precious treasure” in Chinese. Since her birth on August 23, 2014, she’s taken her first steps, explored the outdoors, climbed a tree, and graced the <a href="http://www.smithsonianmag.com/magazine/why-bao-bao-our-cover-girl-180947974/" target="_blank">cover of Smithsonian magazine</a>. Bao Bao will likely remain in the company of her mom, Mei Xiang, for the next two years, as pandas do in the wild, learning how to munch on bamboo and climb more trees. Zoo visitors can see Bao Bao at the Panda House or at home on the <a href="http://nationalzoo.si.edu/animals/webcams/giant-panda.cfm" target="_blank">panda cam</a>.',
        'wildText': 'About 1,600 giant pandas (<a href="http://nationalzoo.si.edu/Animals/GiantPandas/PandaFacts/" target="_blank"><em>Ailuropoda melanoleuca</em></a>) persist in the temperate mountain forests of China, their natural habitat, and the IUCN classifies these majestic animals as <a href="http://www.iucnredlist.org/details/712/0" target="_blank">endangered</a>. Despite intensive conservation efforts, the number of wild pandas continues to decline.',
        'images': ['https://farm8.staticflickr.com/7336/13703501844_c68f6228e7_z.jpg','https://farm8.staticflickr.com/7044/13542517163_093699727e_z.jpg','https://farm6.staticflickr.com/5056/13703152133_bd507a5961_z.jpg']
      },
      'tiger': {
        'species': 'Sumatran Tiger',
        'birthday': 'Aug. 5, 2013',
        'status': 'Critically Endangered',
        'zooText': 'On August 5th, 2013, the National Zoo welcomed their latest pair of <a href="http://nationalzoo.si.edu/Animals/GreatCats/Tiger/tiger-cubs.cfm" target="_blank">Sumatran tiger cubs</a>, named Bandar and Sukacita. In terms of diet, mom and cubs eat family style, as they would in the wild, and consume 77 pounds of meat each day as a group. As the cubs become comfortable moving from their indoor to outdoor enclosures, visitors can catch a glimpse of them hanging out with mom and playing with bags filled with hay and balls in the Great Cats exhibit. ',
        'wildText': 'Scientists estimate that only 400 of this critically endangered species (<em>Panthera tigris ssp. Sumatrae</em>) remain in the wild. Although tigers are legally protected in Sumatra, poaching continues to take a toll, as does a steadily shrinking forest habitat.',
        'images': ['https://farm6.staticflickr.com/5473/10931220815_e992e9c9c4_b.jpg','https://farm4.staticflickr.com/3697/10711994135_0d072aa9aa_b.jpg','https://farm4.staticflickr.com/3807/10931490633_4034dc845f_b.jpg']
      },
      'crocs': {
        'species': 'Cuban Crocodile',
        'birthday': 'July 6, 2012',
        'status': 'Critically Endangered',
        'zooText': 'On July 6th, 2012, the National Zoo’s 55-year-old Cuban crocodile (<a href="http://nationalzoo.si.edu/animals/reptilesamphibians/facts/factsheets/cubancrocodile.cfm" target="_blank"><em>Crocodylus rhombifer</em></a>) named Dorothy surprised zookeepers when one of the 26 eggs she’d laid hatched—and then another hatched a week later. This marked the first Cuban crocodile birth at the Zoo since 1988.',
        'wildText': 'Like most crocodile species, Cuban crocs suffer from habitat loss and illicit human hunting in Cuba’s wild swamps, so the IUCN has labeled them <a href="http://www.iucnredlist.org/details/5670/0" target="_blank">critically endangered</a>. Increased breeding with American crocodiles has produced a growing hybrid population, as well. Scientists estimate that this species has experienced an 80 percent drop in population over the last three generations, and about 4,000 full Cuban crocs still survive in the wild.',
        'images': ['https://farm8.staticflickr.com/7257/7604590544_a4e35186a7_z.jpg','https://farm8.staticflickr.com/7131/7604589062_d79217ec67_z.jpg','https://farm8.staticflickr.com/7252/7604590882_4943c33a79_z.jpg']
      },
      'anemones': {
        'species': 'Tealia Red Anemones',
        'birthday': '2010',
        'status': 'Not Yet Assessed',
        'zooText': 'In August 2010, invertebrate animal keepers successfully bred <a href="http://nationalzoo.si.edu/Animals/Invertebrates/News/anemones.cfm" target="_blank">two species of <em>Urticina anemone</em></a> or Tealia red anemones, using a technique typically used to breed coral. After two anemones spawned that year, keepers collected the sperm and eggs from the large tank that the anemones inhabit. Placing them in a smaller tank to encourage fertilization, the keepers took the larvae and stirred them in a circular tank until they could swim, and then released them into larger aquarium environments. At the time, it was the first successful breeding of anemones in captivity using this technique. ',
        'wildText': 'Sea anemones are not considered endangered, but the ability to breed them in captivity allows researchers to investigate how their reproductive cycles and behaviors work in the wild. Scientists are concerned about the vulnerability of many marine animals, including anemones, due to increasing ocean pollution and changes in ocean chemistry caused by climate change.',
        'images': ['http://smithsonianscience.org/wordpress/wp-content/uploads/2010/08/clip_image001.jpg','http://smithsonianscience.org/wordpress/wp-content/uploads/2010/08/clip_image001x.jpg']
      }
    }
  };

  return configOptions;

});