import { fileExist, fileRead, fileWrite } from './fileHandler.js';
import { cwd } from 'node:process';
import path from 'node:path';


const filePath = path.join(cwd(), 'data.json');

const getNowPlaying = async () => {
  const url =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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
      if (!exist) return fileWrite(filePath, data);
      fileWrite(filePath, data);
    });
  } catch (err) {
    console.log(err);
  }
};

const getPopuler = async () => {
  const url =
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
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
      if (!exist) return fileWrite(filePath, data);
      fileWrite(filePath, data);
    });
  } catch (err) {
    console.log(err);
  }
};

getPopuler();
