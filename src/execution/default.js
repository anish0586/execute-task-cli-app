'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('fs');
const updateJsonFile = require('update-json-file')
const currentWorkingDir = process.cwd();
const saveFileLocation = currentWorkingDir + '/src/taskResults/';

let config, filePath = '';

const validateConfigForThisExecutionMethod = function(input) {
    //check if tasks are present
    const tasks = _.get(input, 'tasks', []);
    if (_.isEmpty(tasks)) {
        throw Error('no tasks are present in the input configuration file');
    }
};

const taskExecution = async function(singleTask) {
    //get information related to each tasks
    const ID = _.get(singleTask, 'ID');
    const taskConfig = _.get(singleTask, 'config');
    const methodName = _.get(singleTask, 'method');

    let resultOfTask;
    const taskMethod = require('../task/default')[methodName];
    const filePath = `${saveFileLocation}${ID}-Result.json`;
    if (taskMethod) {
        //execute the task method if available
        console.log(`Processing Task ID: ${ID}`);
        const data = _.find(config.tasks, function(t) { return t.ID === ID; });
        const startTime = new Date();
        data.start_time = startTime;
        data.status = 'Running';
        //create individual result file for each task
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
        try {
            resultOfTask = await taskMethod(taskConfig);
            await updateJsonFile(filePath, (data) => {                
                data.end_time = new Date();
                data.elapsed_time = data.end_time - startTime;
                data.status = 'Completed';
                data.result = resultOfTask;
                return data
              });
              console.log(`Processing Successfully Completed for Task ID: ${ID}, result is saved at location: ${saveFileLocation}${ID}.json`);
        } catch(error) {
            await updateJsonFile(filePath, (data) => {
                data.end_time = new Date();
                data.elapsed_time = data.end_time - startTime;
                data.status = 'Failed';
                data.error_message = error.message;
                return data
              });
              resultOfTask = {
                  errorMessage: error.message
              }
              console.log(`Execution failed for Task ID: ${ID} with message ${error.message}, result is saved at location: ${saveFileLocation}${ID}.json`);
        }
    }
    return resultOfTask
};

const executionMethod = async function(input, concurrency, fileName) {
    filePath = `${currentWorkingDir}/src/input/files/${fileName}`;
    config = require(filePath);
    //validate config file, make sure it has tasks before using the config
    validateConfigForThisExecutionMethod(input);
    const tasks = _.get(input, 'tasks', []);

    //execute tasks
    const allResults = await Promise.map(tasks, taskExecution, { concurrency });

    //write all results in allResults.json file
    fs.writeFileSync(saveFileLocation + 'allResults.json', JSON.stringify(allResults), 'utf8');
};

module.exports = executionMethod;
