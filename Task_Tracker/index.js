import { Command } from 'commander';
import { input, select, Separator } from '@inquirer/prompts';
import { access, constants, writeFile } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

const saveTask = (data) => {
  const jsonData = JSON.stringify(data);
  const file = path.join(cwd(), 'tasks.json');
  access(file, constants.F_OK, (err) => {
    console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
    writeFile(file, jsonData, (err) => {
      if (err) throw err;
      console.log('The File has beend saved!');
    });
  });
};
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
  .action(async () => {
    const description = await input({
      message: 'Task Name',
      default: 'Task 1',
    });
    const status = await select({
      message: 'Select the Status',
      choices: [
        {
          name: 'To do',
          value: 'todo',
          description: 'Task Not Start Yet',
        },
        {
          name: 'In Progress',
          value: 'in-progress',
          description: 'Task In Progress',
        },
        {
          name: 'Done',
          value: 'done',
          description: 'Task is Done Successfully',
        },
      ],
    });
    const date = new Date(Date.now());
    const data = {
      id: 1,
      description,
      status,
      createdAt: date.toLocaleString(),
      updatedAt: null,
    };
    console.log(data);
    saveTask(data);
  });

program.parse();
