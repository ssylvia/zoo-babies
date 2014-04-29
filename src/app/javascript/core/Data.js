define([],
  function(){

  /**
   * Data
   * @class Data
   */

  var configOptions = {
    boundaryMap: {
      webmapId: "6062139d42a24ed7841fe42363a841ca",
      element: "boundary-map"
    },
    zooMap: {
      webmapId: "705c481ee1b542199d341ba31eb72f68",
      element: "zoo-map"
    },
    proxyUrl: "",
    geometryServiceUrl: "http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
    sharingUrl: "http://www.arcgis.com/sharing/rest/content/items",
    animals: {
      "lion": {
        "species": "African Lion",
        "birthday": "Jan. 24, 2014 and March 2, 2014",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, quisquam aperiam placeat eaque ipsam excepturi repellat quia sunt expedita commodi quam maxime amet. Rerum, ab, ea, culpa impedit laborum libero soluta beatae accusantium aspernatur dolorem iure maiores eaque doloribus cum.",
        "images": ["https://farm4.staticflickr.com/3680/12351219724_6a231df8a4_z.jpg","https://farm8.staticflickr.com/7433/12350945363_47c55eba71_z.jpg","https://farm4.staticflickr.com/3782/13380785174_1f8884867c_z.jpg"]
      },
      "greySeal": {
        "species": "Grey Seal",
        "birthday": "Jan. 22, 2014",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, porro, harum, repellat voluptas minima illo nulla modi officiis at illum sapiente accusantium hic omnis ad iusto accusamus voluptatem suscipit est quisquam reprehenderit quam architecto neque ipsam possimus rem aspernatur recusandae.",
        "images": ["https://farm8.staticflickr.com/7359/12236296036_8c65502182_z.jpg","https://farm6.staticflickr.com/5464/13426084754_a3f017d97a_z.jpg","https://farm8.staticflickr.com/7384/13426086394_baf0bcd95e_z.jpg"]
      },
      "gazelle": {
        "species": "Dama Gazelle",
        "birthday": "Feb. 18-25, 2014",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, nesciunt sapiente ex tempora iure recusandae. Dignissimos, exercitationem, dolorem, magnam, magni nulla et aperiam mollitia illo repudiandae consectetur porro officiis molestias saepe reiciendis voluptatem harum suscipit ipsam fugit quidem laboriosam a!",
        "images": ["https://farm3.staticflickr.com/2175/13083134063_a770c99038_z.jpg","https://farm8.staticflickr.com/7415/13083376534_5bf5f0facf_z.jpg","https://farm8.staticflickr.com/7392/13083311244_8b85928f6b_z.jpg"]
      },
      "kingFisher": {
        "species": "Micronesian King Fisher",
        "birthday": "Jan 1, 2014",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quis, facere, dolorem, aliquid illum consequatur minus explicabo commodi vitae dolor voluptates doloribus quod ab incidunt odit quidem labore veniam in repellat magni ipsam laudantium vero quos saepe aliquam ratione dolores.",
        "images": ["https://farm3.staticflickr.com/2820/12121986613_6969a5a42c_z.jpg","https://farm4.staticflickr.com/3677/12122106034_1efaac336d_z.jpg"]
      },
      "slothBear": {
        "species": "Sloth Bear",
        "birthday": "Dec. 29, 2013",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, accusantium eum distinctio explicabo aliquid similique libero deleniti rem quod nihil. Provident, repudiandae illo repellendus molestias autem reprehenderit voluptate? Rem, consequatur cupiditate mollitia officiis expedita perspiciatis adipisci fugit sunt inventore pariatur!",
        "images": ["https://farm8.staticflickr.com/7361/9091898223_a5fcb06d98_z.jpg","https://farm3.staticflickr.com/2869/9094117286_050e82c069_z.jpg","https://farm4.staticflickr.com/3757/9091895797_27a1854490_z.jpg"]
      },
      "horse": {
        "species": "Przewalski Horse",
        "birthday": "Aug. 31, 2013",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, quas, consequatur expedita consectetur esse perferendis quae quibusdam neque maiores odit corrupti natus optio explicabo doloribus nemo aliquam facilis earum ipsum ab iste deleniti recusandae eius. Rem asperiores quibusdam qui aliquam?",
        "images": ["https://farm4.staticflickr.com/3699/9408984831_afeb46dea6_z.jpg","https://farm3.staticflickr.com/2813/9408982123_dc24647c32_z.jpg","https://farm4.staticflickr.com/3802/9411745468_a2e413e616_z.jpg"]
      },
      "panda": {
        "species": "Giant Panda",
        "birthday": "Aug. 23, 2013",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempora, non, quo, nemo cumque cupiditate reiciendis enim perspiciatis vitae aspernatur cum quidem aliquam ab saepe totam omnis quam. Saepe, optio, dolores maxime quas repellat harum nobis possimus pariatur magnam obcaecati.",
        "images": ["https://farm8.staticflickr.com/7336/13703501844_c68f6228e7_z.jpg","https://farm8.staticflickr.com/7044/13542517163_093699727e_z.jpg","https://farm6.staticflickr.com/5056/13703152133_bd507a5961_z.jpg"]
      },
      "tiger": {
        "species": "Sumatran Tiger",
        "birthday": "Aug. 5, 2013",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, cumque, numquam, ullam, sunt eos vitae nulla minus maxime voluptate unde quod velit dolores doloremque. Commodi, mollitia voluptatibus impedit aliquid eaque dolor inventore ducimus beatae illo ex officia sed ab dolores.",
        "images": ["https://farm6.staticflickr.com/5473/10931220815_e992e9c9c4_b.jpg","https://farm4.staticflickr.com/3697/10711994135_0d072aa9aa_b.jpg","https://farm4.staticflickr.com/3807/10931490633_4034dc845f_b.jpg"]
      },
      "crocs": {
        "species": "Cuban Crocodile",
        "birthday": "July 6, 2012",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, consequuntur, corporis, sunt distinctio eum fuga quidem quos necessitatibus sint nisi est reprehenderit qui reiciendis! Cupiditate, officia, repellendus illo rerum qui ducimus numquam doloremque adipisci velit placeat quidem mollitia aspernatur dicta.",
        "images": ["https://farm8.staticflickr.com/7257/7604590544_a4e35186a7_z.jpg","https://farm8.staticflickr.com/7131/7604589062_d79217ec67_z.jpg","https://farm8.staticflickr.com/7252/7604590882_4943c33a79_z.jpg"]
      },
      "anemones": {
        "species": "Tealia Red Anemones",
        "birthday": "2010",
        "scientificName": "Add Scientific Name",
        "status": "Add Red List Status",
        "name": "Add name here",
        "zooText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, natus, minima, ipsum enim ducimus impedit pariatur doloribus quasi sint culpa quisquam aperiam quam ad totam molestias ipsam error. Doloremque, odio, sint corporis blanditiis adipisci maiores quidem officiis cumque quibusdam officia necessitatibus nostrum quo iste asperiores illo in expedita maxime quisquam est nesciunt! Eum, excepturi, officia, blanditiis ratione reprehenderit tenetur illo pariatur aliquid necessitatibus ullam voluptates deserunt facilis obcaecati commodi nisi nobis hic adipisci modi molestiae ipsum sint explicabo consectetur aliquam. Ducimus quam quo dignissimos! Esse, culpa asperiores eum itaque cupiditate. Laborum, eos quidem nulla nisi commodi adipisci. Sit, architecto, incidunt, et illo minima id quia eius illum sunt nam tempore aspernatur sed ad laudantium hic! Sunt, officia, numquam, tenetur deleniti eligendi saepe inventore dolorum culpa provident dolorem quo esse sit voluptates at quae eum impedit magni expedita ex perferendis officiis nesciunt fugiat! A, incidunt quod excepturi ratione. Quibusdam libero quam inventore dicta. Vitae, minima nihil perspiciatis asperiores dolor nisi enim repellat incidunt maiores illum quaerat ad saepe sunt consequatur obcaecati ipsa rerum hic harum cum a assumenda deserunt nulla facilis ex eum accusamus molestias sequi recusandae doloremque ea repudiandae aperiam dolorum necessitatibus ratione voluptas fugit ipsum nobis reprehenderit porro modi?",
        "wildText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, amet, distinctio autem esse quam tempore nisi inventore ullam iure magni eaque cumque beatae quos! Quae, vitae, consequatur, quisquam soluta reiciendis doloribus quibusdam dignissimos minima eligendi error provident laborum enim voluptate!",
        "images": ["http://smithsonianscience.org/wordpress/wp-content/uploads/2010/08/clip_image001.jpg","http://smithsonianscience.org/wordpress/wp-content/uploads/2010/08/clip_image001x.jpg"]
      }
    }
  };

  return configOptions;

});