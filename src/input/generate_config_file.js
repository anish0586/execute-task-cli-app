'use strict';

const _ = require('lodash');
const fs = require('fs');
const currentWorkingDir = process.cwd();

//inputs
const saveFileLocation = currentWorkingDir + '/src/input/files/';
const config = require('../config/config.json');

//method to generate the config file
const generateConfig = function(taskFilePath, fileName) {    
    const configurationName = 'Task Configuration';
    if (taskFilePath === '') {
        taskFilePath = './files/test_config.json';
    }
    const taskList = require(taskFilePath);
    let tasks = [];
    let counter = 1;

    taskList.forEach((task) => {
        let pos = _.findIndex(config, function(o) { return o.taskName === task.taskName; });
        const singleTask = {
            "ID": `Task-${counter}`,
            "kind": config[pos].taskName,
            "description": config[pos].taskDescription,
            "status": "",
            "start_time": "",
            "end_time": "",
            "elapsed_time": "",
            "config": {},
            "method": config[pos].taskMethod,
            "result": "",
            "error_message": ""
        }
        config[pos].config.forEach((val) => {
            singleTask.config[val] = task[val]
        })
        counter++;
        tasks.push(singleTask);
    });

    const taskConfigurationData = {
        configurationName,
        tasks        
    };

    //create the input file;
    fs.writeFileSync(saveFileLocation + fileName, JSON.stringify(taskConfigurationData), 'utf8');
    return fileName;
};

module.exports = generateConfig;
