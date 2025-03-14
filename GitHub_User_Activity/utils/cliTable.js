import Table from 'cli-table3';

let pushTable = new Table({
  style: {
    head: [], //disable colors in header cells
    border: [], //disable colors for the border
  },
  colWidths: [15, 100], //set the widths of each column (optional)
});

let createTable = new Table({
  style: {
    head: [], //disable colors in header cells
    border: [], //disable colors for the border
  },
  colWidths: [15, 100], //set the widths of each column (optional)
});

let watchTable = new Table({
  style: {
    head: [], //disable colors in header cells
    border: [], //disable colors for the border
  },
  colWidths: [15, 100], //set the widths of each column (optional)
});

/**
 * *********************************************************************************************************************
 *                                              Helper Functions
 * *********************************************************************************************************************
 */

/**
 * *********************************************************************************************************************
 *                                              Export Functions
 * *********************************************************************************************************************
 */

const printTable = (data) => {
  let pushCount = 0;
  let createCount = 0;
  let watchCount = 0;
  let maxPushCount = 1;
  let maxCreateCount = 1;
  let maxWatchCount = 1;
  for (const item of data) {
    const { type, repo, payload, created_at } = item;
    if (type === 'PushEvent') {
      if (pushCount < maxPushCount) {
        const message = payload.commits[0].message;
        pushTable.push(
          ['Repo', repo.name],
          ['Date', created_at],
          ['Action', message]
        );
        pushCount++;
      }
    }
    if (type === 'CreateEvent') {
      if (createCount < maxCreateCount) {
        const message = payload.description;
        createTable.push(
          ['Repo', repo.name],
          ['Date', created_at],
          ['Action', message]
        );
        createCount++;
      }
    }
    if (type === 'WatchEvent') {
      if (watchCount < maxWatchCount) {
        watchTable.push(['Repo', repo.name], ['Date', created_at]);
        watchCount++;
      }
    }
  }
  console.log(`$ Push Event :`);
  console.log(pushTable.toString());
  console.log(`$ Create Event :`);
  console.log(createTable.toString());
  console.log(`$ Watch Event :`);
  console.log(watchTable.toString());
};

export default printTable;
