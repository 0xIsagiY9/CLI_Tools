import { fileExist, fileRead, fileWrite } from './fileHandler.js';
import printTable from './cliTable.js';
import { cwd } from 'node:process';
import path from 'node:path';

const filePath = path.join(cwd(), 'data.json');

const fetchData = async (type) => {
  if (type === 'playing') type = 'now_playing';
  else if (type === 'top') type = 'top_rated';
  else type = 'popular';
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`;
  console.log(url);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjVjYTQ0YjI5ZmNhZjYwODRlNTU4ZmI3M2VkYjU2MCIsIm5iZiI6MTc0MjMwOTg5NC4xNjksInN1YiI6IjY3ZDk4YTA2YzA1NjZhMTAwYTA4OWFhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4IOrNjM6uCsJoCz_NhE3O8uTQtcqkycDMTZeOOsZiCs',
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    fileExist(filePath, (exist) => {
      if (!exist) return fileWrite(filePath, data.results);
      fileWrite(filePath, data.results);
    });
  } catch (err) {
    console.log(err);
  }
};

const extractData = () => {
  fileExist(filePath, (exits) => {
    if (!exits) {
      console.log(`There is No File`);
      process.exit();
    }
    fileRead(filePath, (data) => {
      if (!data) {
        console.log(`There is No Data`);
        process.exit();
      }
      printTable(data);
    });
  });
};

const PerformOperation = async (type) => {
  await fetchData(type);
  extractData();
};

export default PerformOperation;
