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
    'Allows users to create a new task with a name, status, and timestamp.'
  )
  .action(addTask);

program
  .command('delete')
  .description('Allow Users to delete a task with the TaskID')
  .action(deleteTask);

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
  .action();

program.parse();
