const path = require("path");
const {getFilesInDirectory, readJSONFile} = require("./fileSystemUtils");


const inputLayoutPath = path.join('./', 'src', 'defaultConfig', 'layouts', 'input');
const outputLayoutPath = path.join('./', 'src', 'defaultConfig', 'layouts', 'output');

const keepJsonFiles = (files) => {
    return files.filter(file => file.endsWith('.json'))
}

const truncateJSONExtension = (files) => {
    return files.map(file => file.substring(0, file.length - 5));
}

const getInputLayoutFiles = () => {
    return getFilesInDirectory(inputLayoutPath);
}

const getOutputLayoutFiles = () => {
    return getFilesInDirectory(outputLayoutPath);
}

const getInputLayouts = () => {
    return truncateJSONExtension(
        keepJsonFiles(getInputLayoutFiles()));
}

const getOutputLayouts = () => {
    return truncateJSONExtension(
        keepJsonFiles(getOutputLayoutFiles()));
}

const getInputLayoutConfig = (layout) => {
    const filename = path.join(inputLayoutPath, layout + ".json");
    return readJSONFile(filename);
}

const getOutputLayoutConfig = (layout) => {
    const filename = path.join(outputLayoutPath, layout + ".json");
    return readJSONFile(filename);
}

const getInputLayoutFields = (layout) => {
    return Object.keys(
        getInputLayoutConfig(layout)
    )

}

const getOutputLayoutFields = (layout) => {
    return Object.keys(
        getOutputLayoutConfig(layout)
    )
}


module.exports = {
    getInputLayouts,
    getOutputLayouts,
    getInputLayoutConfig,
    getOutputLayoutConfig,
    getInputLayoutFields,
    getOutputLayoutFields
}