const fs = require('fs');


const getFilesInDirectory = (directoryPath) => {
    return fs.readdirSync(directoryPath);
}

const readJSONFile = (fileName) => {
    return JSON.parse(fs.readFileSync(fileName));
}


module.exports = {
    getFilesInDirectory,
    readJSONFile
}

