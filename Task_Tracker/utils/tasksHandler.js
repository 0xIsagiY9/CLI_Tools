import { input, select } from '@inquirer/prompts';
import { cwd } from 'node:process';
import path from 'node:path';
import { fileExist, fileRead, fileWrite } from './fileHandler.js';
import printTable from './cliTable.js';

/**
 * **********************************************************************************************************
 *                                          Variables
 * **********************************************************************************************************
 */

const filePath = path.join(cwd(), 'data.json');

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
      printTable([newTask]);
      //3) Save Task to File
      fileWrite(filePath, data);
      console.log(`Task Created Successfully :)`);
    });
  });
};

const addTask = async () => {
  const description = await input({
    message: 'Task Name',
    default: 'Task 1',
  });
  const taskStatus = await select({
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
  const newdata = {
    id: 1,
    description,
    taskStatus,
    createdAt: new Date(Date.now()).toLocaleString(),
    updatedAt: null,
  };
  saveTask(newdata);
};

const deleteTask = (option) => {
  fileRead(filePath, (data) => {
    if (!data) {
      console.log(`Error In Data`);
      process.exit();
    }
    //Remove the Selected Id Task
    if (Object.keys(option).length !== 0) {
      const idToRemove = Number(option.id);
      const filterdTask = data.filter((item) => item.id !== idToRemove);
      if (filterdTask.length === data.length) {
        console.log(`Task with ID ${idToRemove} not found.`);
        process.exit();
      }
      fileWrite(filePath, filterdTask);
      console.log(`Task with Id: ${idToRemove} Deleted Successfully :)`);
    } else {
      data = [];
      fileWrite(filePath, data);
      console.log(`Tasks Deleted Successfully :)`);
    }
  });
};

const listTask = (option) => {
  fileRead(filePath, (data) => {
    if (!data) {
      console.log(`Error In Data`);
      process.exit();
    }
    if (option.all || Object.keys(option).length === 0) {
      console.log('All Tasks:\n');
      printTable(data);
    }
    if (option.done) {
      const doneTasks = data.filter((task) => task.taskStatus === 'done');
      console.log('Done Tasks:\n');
      printTable(doneTasks);
    }
    if (option.todo) {
      const todoTasks = data.filter((task) => task.taskStatus === 'todo');
      console.log('Todo Tasks:\n');
      printTable(todoTasks);
    }
    if (option.progress) {
      const progressTasks = data.filter(
        (task) => task.taskStatus === 'in-progress'
      );
      console.log('In Progress Tasks:\n');
      printTable(progressTasks);
    }
  });
};
const updateTask = (idOption, statusOption) => {
  //1) Read the Data
  fileRead(filePath, (data) => {
    if (!data) {
      console.log(`Error In Data`);
      process.exit();
    }
    //2) Search for the ID
    const idTofind = Number(idOption);
    const taskIndex = data.findIndex((item) => item.id === idTofind);
    if (taskIndex === -1) {
      console.log(`Thas with the ID ${idOption} not found`);
      process.exit();
    }
    data[taskIndex].taskStatus = statusOption;
    (data[taskIndex].updatedAt = new Date(Date.now()).toLocaleString()),
      fileWrite(filePath, data);
    console.log(`Task Updated Successfully :) \n`);
    printTable([data[taskIndex]]);
  });
};

export { addTask, deleteTask, listTask, updateTask };
