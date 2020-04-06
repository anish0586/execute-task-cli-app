'use strict';

const Promise = require('bluebird');

const delayTask = async function(taskConfig) {
    if (taskConfig.time) {
        //delay for the time specified in the config - time in ms
        await Promise.delay(taskConfig.time);
        if (taskConfig.result === 'success') {
            return {
                //generate a random number
                randon_number: Math.floor(Math.random() * 1000)
            }
        } else {
            //throw error in case of failure
            throw Error("Emulating task failure");
        }
    }
    //if time not present, throw config not present error
    throw Error("Config not present");
};

module.exports = {
    delayTask
};
