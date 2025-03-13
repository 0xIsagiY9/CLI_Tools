import Table from 'cli-table3';

let table = new Table({
  head: ['Id', 'Description', 'Status', 'Date', 'Update'],
  style: {
    head: [], //disable colors in header cells
    border: [], //disable colors for the border
  },
  colWidths: [6, 50, 20, 23, 23], //set the widths of each column (optional)
});

const printTable = (task) => {
  for (let i = 0; i < task.length; i++) {
    let { id, description, taskStatus, createdAt, updatedAt } = task[i];
    if (!updatedAt) updatedAt = 'No Update';
    table.push([id, description, taskStatus, createdAt, updatedAt]);
  }
  console.log(table.toString());
};

export default printTable;
