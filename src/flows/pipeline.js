const fs = require("fs");
const csv = require("fast-csv");
const {getParser} = require("../transformation/parser");
const {getFormatter} = require("../formatting/formatter");
const {readJSONFile} = require("../utils/fileSystemUtils");

const readConfig = (configFilePath) => {
    return readJSONFile(configFilePath);
}

/**
 * Uses fast-csv to stream a source csv file, transform it,
 * then pipe the output to either the terminal or destinationPath
 *
 * @param inputFilePath
 * @param outputFilePath
 * @param configPath
 */
const runPipeline = (inputFilePath, outputFilePath, configPath) => {
    const config = readConfig(configPath);
    const transformer = getParser(config['rules']);
    const formatter = getFormatter(config['output']['format'])
    const outputFields = config['output']['fields'];

    const readStream = fs.createReadStream(inputFilePath);
    const parseStream = csv.parse({ignoreEmpty: true, discardUnmappedColumns: true, headers: true});
    const transformStream = csv.format({headers: true}).transform((row) => {
        let ret = transformer(row);
        ret = Object.fromEntries(outputFields.map(key => [key, ret[key]]));
        ret = formatter(ret);

        return ret;

    });

    let writeStream = process.stdout;
    if (outputFilePath)
        writeStream = fs.createWriteStream(outputFilePath);

    readStream
        .pipe(parseStream)
        .pipe(transformStream)
        .pipe(writeStream);

}

module.exports = {
    runPipeline
}