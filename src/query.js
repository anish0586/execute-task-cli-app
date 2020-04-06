'use strict';

const _ = require('lodash');

const main = async function(action, taskID, fileName) {
    try {
        const taskResult = require(`./taskResults/${taskID}-Result`);
        if (taskResult) {
            if (action === 'status') {
                console.log(`Status of Task ID: ${taskID} is ${taskResult.status}`)
                return taskResult.status;
            } 
            console.log(`Summary of Task ID: ${taskID} is ${JSON.stringify(taskResult)}`)
            return taskResult;                
        }
        console.log('Task Id doesn\'t exist');     
    } catch (error) {
        const taskList = require(`./input/files/${fileName}`);
        const pos = _.findIndex(taskList.tasks, function(o) { return o.ID === taskID });
        if (pos > -1) {
            console.log(`Status of Task ID: ${taskID} not started yet`);
            return;
        } else if (pos === -1) {
            console.log('Task Id doesn\'t exist');
            return;
        }
        console.log('\nAn error occurred and has stopped execution');
        console.log('----------------------------------------------');
        console.log(`error message: ${error.message}`);
        console.log(error);
        console.log('\n\n');
        return;
    }
};

module.exports = main;
