import { fileExist, fileRead, fileWrite } from './fileHandler.js';
import { cwd } from 'node:process';
import path from 'node:path';
import { fips } from 'node:crypto';

const filePath = path.join(cwd(), 'data.json');
const getUserData = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    const data = await response.json();
    fileExist(filePath, (exist) => {
      if (!exist) return fileWrite(filePath, data);
      fileWrite(filePath, data);
    });
  } catch (err) {
    console.error(err);
  }
};

const extractData = () => {
  fileExist(filePath, (exits) => {
    if (!exits) {
      console.log(`There is Not File`);
      process.exit();
    }
    fileRead(filePath, (data) => {
      if (!data) {
        console.log(`There is No Data`);
        process.exit();
      }

    });
  });
};

const performOperation = (username) => {
  getUserData(username);
  extractData();
};
export { performOperation };
