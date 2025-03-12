import { input, select } from '@inquirer/prompts';
import { access, constants, writeFile, readFile, read } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

/**
 * **********************************************************************************************************
 *                                          Variables
 * **********************************************************************************************************
 */

const file = path.join(cwd(), 'tasks.json');

/**
 * **********************************************************************************************************
 *                                              Functions
 * **********************************************************************************************************
 */

const saveTask = (newTask) => {
  // Check if File exist or no
  access(file, constants.F_OK, (err) => {
    if (err) {
      console.log('File does not exist. Creating New Fiel....!');
      return writeFile(file, JSON.stringify([newTask]), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log('Task Created Successfully !!');
      });
    }

    readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      let readTasks;
      try {
        readTasks = JSON.parse(data);
        if (!Array.isArray(readTasks)) readTasks = [];
      } catch (err) {
        console.log(
          'File content is not valid JSON. Initializing as empty array.'
        );
        readTasks = [];
      }
      readTasks.push(newTask);
      writeFile(file, JSON.stringify(readTasks), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log('Task Created Successfully !!');
      });
    });
  });
};

const addTask = async () => {
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
  readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    let readTasks;
    try {
      readTasks = JSON.parse(data);
      if (!Array.isArray(readTasks)) readTasks = [];
    } catch (err) {
      console.log(
        'File content is not valid JSON. Initializing as empty array.'
      );
      readTasks = [];
    }
    const lastTask = readTasks.at(-1);
    let lastTaskId;
    if (!lastTask) lastTaskId = 0;
    else lastTaskId = lastTask.id;

    const date = new Date(Date.now());
    const newdata = {
      id: lastTaskId + 1,
      description,
      status,
      createdAt: date.toLocaleString(),
      updatedAt: null,
    };
    console.log(newdata);
    saveTask(newdata);
  });
};

const deleteTask = async () => {};

const listTask = async (option) => {
  let tasksJson = [];
  readFile(file, 'utf-8', (err, data) => {
    if (err) throw err;
    tasksJson = JSON.parse(data);

    if (option.all) console.log('All Tasks:\n', tasksJson);
    if (option.done) {
      const doneTasks = tasksJson.filter((task) => task.status === 'done');
      console.log('Done Tasks:\n', doneTasks);
    }
    if (option.todo) {
      const todoTasks = tasksJson.filter((task) => task.status === 'todo');
      console.log('Todo Tasks:\n', todoTasks);
    }
    if (option.progress) {
      const progressTasks = tasksJson.filter(
        (task) => task.status === 'in-progress'
      );
      console.log('In Progress Tasks:\n', progressTasks);
    }
  });
};
const updateTask = async (id) => {};

export { addTask, deleteTask, listTask, updateTask };
