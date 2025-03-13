import { Command } from 'commander';

import {
  addTask,
  deleteTask,
  listTask,
  updateTask,
} from './utils/tasksHandler.js';

const program = new Command();

program
  .name('Task_Tracker')
  .description(
    `
    Task tracker is a project used to track and manage your tasks. In this task,
    you will build a simple command line interface (CLI) to track what you need to do,
    what you have done, and what you are currently working on.
    `
  )
  .version('1.0.0');

program
  .command('add')
  .description(
    'Allows users to create a new task with a name, status, and data.'
  )
  .action(addTask);

program
  .command('delete')
  .description('Allow Users to delete a task with the TaskID')
  .option('-i , --id <number>', 'Delte the Task with Id')
  .action((option) => deleteTask(option));

program
  .command('list')
  .description('Allow Users to list tasks')
  .option('-a , --all', 'List all Tasks')
  .option('-d, --done', 'List all done Tasks')
  .option('-t , --todo', 'List all todo Tasks')
  .option('-p, --progress', 'List all in-progress Tasks')
  .action((option) => listTask(option));

program
  .command('update')
  .description('Allow Users to Update task with the TaskID')
  .option('-i, --id <number>', 'Enter the Task Id')
  .option('-s,--status <string>', 'Enter The New Status of Task')
  .action((options) => {
    const { id, status } = options;
    updateTask(id, status);
  });

program.parse();
