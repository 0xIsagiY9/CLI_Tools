import Table from 'cli-table3';

const createTableConfig = () => {
  return {
    style: {
      head: [], //disable colors in header cells
      border: [], //disable colors for the border
    },
    colWidths: [15, 100], //set the widths of each column (optional)
  };
};

/**
 * Adds an event to the appropriate table
 * @param {Object} table - The table to add data to
 * @param {Object} event - The event data
 * @param {string} actionMessage - The message to display for the action
 */
const addEventToTable = (table, event, actionMessage) => {
  table.push(
    ['Repository', event.repo.name], // Fix typo here
    ['Action', actionMessage || ''],
    ['Date', event.created_at]
  );
};

/**
 * *********************************************************************************************************************
 *                                              Export Functions
 * *********************************************************************************************************************
 */

const printTable = (data) => {
  const pushTable = new Table(createTableConfig());
  const createTable = new Table(createTableConfig());
  const watchTable = new Table(createTableConfig());
  const eventCounts = {
    push: 0,
    create: 0,
    watch: 0,
  };

  const maxEvents = 2;

  for (const _event of data) {
    const { type, repo, payload, created_at } = _event;
    if (type === 'PushEvent' && eventCounts.push < maxEvents) {
      const message = payload.commits[0].message;
      addEventToTable(pushTable, _event, message);
      eventCounts.push++;
    }
    if (type === 'CreateEvent' && eventCounts.create < maxEvents) {
      const message = payload.description;
      addEventToTable(createTable, _event, message);
      eventCounts.create++;
    }
    if (type === 'WatchEvent' && eventCounts.watch < maxEvents) {
      addEventToTable(watchTable, _event);
      eventCounts.watch++;
    }
  }
  console.log(`$ Push Event:`);
  console.log(pushTable.toString());
  console.log(`$ Create Event:`);
  console.log(createTable.toString());
  console.log(`$ Watch Event:`);
  console.log(watchTable.toString());
};

export default printTable;
