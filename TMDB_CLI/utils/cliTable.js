import Table from 'cli-table3';

const createTableConfig = () => {
  return {
    style: {
      head: [],
      border: [],
    },
    colWidths: [15, 170],
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

  for (const _event of data) {
    addEventToTable(table, _event);
  }

  console.log(table.toString());
};

export default printTable;
