#! /usr/bin/env node

const {Command} = require('commander');
const {runPipeline} = require("../flows/pipeline");

const program = new Command();
program.version('0.0.1').name('csv-rules').description('Data Importer Utility for Signetic MVS');

program
    .command('run <csvFile>')
    .option('-c, --config <configFile>', 'Config File Path', 'csv-rules.config.json')
    .option('-o, --output <outputFile>', 'Output File Path', null)
    .description('Transform the given CSV using provided rules')
    .action((csvFile, args) => {
        let {
            config,
            output
        } = args;

        runPipeline(csvFile, output, config);
    });


program.action(() => {
    console.log('> Welcome to the Data Importer Utilty CLI');

    // do stuff

    program.help();
});

program.parse(process.argv);