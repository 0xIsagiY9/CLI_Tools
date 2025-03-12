import { input, select } from '@inquirer/prompts';
import { cwd } from 'node:process';
import path from 'node:path';
import { fileExist, fileRead, fileWrite } from './fileHandler.js';
import { access, constants, readFile, writeFile } from 'node:fs';

/**
 * **********************************************************************************************************
 *                                          Variables
 * **********************************************************************************************************
 */

const filePath = path.join(cwd(), 'tasks.json');

/**
 * **********************************************************************************************************
 *                                              Functions
 * **********************************************************************************************************
 */

const saveTask = (newTask) => {
  //1) Check if File Exist
  fileExist(filePath, (exist) => {
    if (!exist) return fileWrite(filePath, [newTask]);
    //2) Read File
    fileRead(filePath, (data) => {
      if (!data) {
        console.log(`Error In Data`);
        process.exit();
      }
      let lastData = data.at(-1);
      let lastId;
      if (!lastData) lastId = 0;
      else lastId = lastData.id;
      newTask.id = lastId + 1;
      data.push(newTask);
      console.log(newTask);
      //3) Save Task to File
      fileWrite(filePath, data);
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
  const date = new Date(Date.now());
  const newdata = {
    id: 1,
    description,
    status,
    createdAt: date.toLocaleString(),
    updatedAt: null,
  };
  saveTask(newdata);
};

const deleteTask = async () => {};

const listTask = (option) => {
  fileRead(filePath, (data) => {
    if (!data) {
      console.log(`Error In Data`);
      process.exit();
    }

    if (option.all) console.log('All Tasks:\n', data);
    if (option.done) {
      const doneTasks = data.filter((task) => task.status === 'done');
      console.log('Done Tasks:\n', doneTasks);
    }
    if (option.todo) {
      const todoTasks = data.filter((task) => task.status === 'todo');
      console.log('Todo Tasks:\n', todoTasks);
    }
    if (option.progress) {
      const progressTasks = data.filter(
        (task) => task.status === 'in-progress'
      );
      console.log('In Progress Tasks:\n', progressTasks);
    }
  });
};
const updateTask = async (id) => {};

export { addTask, deleteTask, listTask, updateTask };
