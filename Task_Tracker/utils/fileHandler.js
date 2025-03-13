import { access, constants, readFile, writeFile } from 'node:fs';

const fileExist = (file, callback) => {
  access(file, constants.F_OK, (err) => {
    if (err) {
      console.log('File does not Exist, Creating New File .....');
      return callback(false);
    }
    callback(true);
  });
};

const fileWrite = (file, content) => {
  writeFile(file, JSON.stringify(content), 'utf-8', (err) => {
    if (err) {
      console.log(`Error in Create/Add Task:\n ${err}`);
      process.exit();
    }
  });
};

/**
 *
 * @param {*} file
 * @param {*} callback  The callback Should Containt the Data
 */
const fileRead = (file, callback) => {
  readFile(file, 'utf-8', (err, data) => {
    if (err) {
      console.log(`Error in Read File:\n ${err}`);
      callback([]);
    }
    let retData;
    try {
      retData = JSON.parse(data);
      if (!Array.isArray(retData)) retData = [];
    } catch (err) {
      console.log(
        `File Content is Not valid JSON. Initialiaing as empty array.`
      );
      retData = [];
    }
    callback(retData);
  });
};

export { fileExist, fileWrite, fileRead };
