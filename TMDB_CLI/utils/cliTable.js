import Table from 'cli-table3';

const createTableConfig = () => {
  return {
    style: {
      head: [], //disable colors in header cells
      border: [], //disable colors for the border
    },
    colWidths: [15, 170], //set the widths of each column (optional)
  };
};

const addEventToTable = (table, event) => {
  table.push(
    ['Name', event.title],
    ['Overview', event.overview],
    ['Date', event.release_date],
    ['Language', event.original_language],
    ['Adult', event.adult],
    ['Average Rate', event.vote_average]
  );
};

const printTable = (data) => {
  const table = new Table(createTableConfig());

  for (const _evnet of data) {
    addEventToTable(table, _evnet);
  }

  console.log(table.toString());
};

const results = [
  {
    adult: false,
    backdrop_path: '/2siOHQYDG7gCQB6g69g2pTZiSia.jpg',
    genre_ids: [10751, 14],
    id: 447273,
    original_language: 'en',
    original_title: 'Snow White',
    overview:
      'A princess joins forces with seven dwarfs to liberate her kingdom from her cruel stepmother, the Evil Queen.',
    popularity: 30.454,
    poster_path: '/xWWg47tTfparvjK0WJNX4xL8lW2.jpg',
    release_date: '2025-03-19',
    title: 'Snow White',
    video: false,
    vote_average: 3.8,
    vote_count: 68,
  },
  {
    adult: false,
    backdrop_path: '/qMYb0pTEnsYsYPVD1uJIpOMumYB.jpg',
    genre_ids: [18, 35],
    id: 1107215,
    original_language: 'fr',
    original_title: 'Ma mère, Dieu et Sylvie Vartan',
    overview:
      "In 1963, Esther gives birth to Roland, the youngest of a large family. Roland is born with a club foot that prevents him from standing. Against everyone's advice, she promises her son that he will walk like the others and that he will have a fabulous life. From then on, Esther will do everything in her power to keep this promise. Through decades of trials and miracles of life, this film is the story of a true, funny and moving story, that of an incredible destiny and the greatest love there is: that of a mother for her child.",
    popularity: 22.939,
    poster_path: '/sIYUhbkjgedkYuiQ9MW3fzyc7Gf.jpg',
    release_date: '2025-03-19',
    title: 'My Mom, God and Sylvie Vartan',
    video: false,
    vote_average: 5.75,
    vote_count: 2,
  },
];

printTable(results);
