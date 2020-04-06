'use strict';

const _ = require('lodash');
const generateInputFile = require('./input/generate_config_file');
//specify the execution method to use
const executionMethod = require('./execution/default');

const main = async function(filePath, concurrency, fileName) {
    console.log('\n');
    console.log('----------------------------------------------');
    console.log('Start Execution =>');
    console.log('----------------------------------------------');
    console.log('\n');
    try {
        //generate task config file the task file
        await generateInputFile(filePath, fileName);                                
        const input = require(`./input/files/${fileName}`);
        //execute the tasks specified in config file
        await executionMethod(input, concurrency, fileName);

        console.log('\n');
        console.log('----------------------------------------------');
        console.log('Execution Complete');
        console.log('----------------------------------------------');
        console.log('\n');
    } catch (error) {
        console.log('\nAn error occurred and has stopped execution');
        console.log('----------------------------------------------');
        console.log(`error message: ${error.message}`);
        console.log(error);
        console.log('\n\n');
        return;
    }    
};

module.exports = main;
