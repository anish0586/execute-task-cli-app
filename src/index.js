#!/usr/bin/env node

const yargs = require("yargs");
const _ = require("lodash");
const execute = require('./execute');
const query = require('./query');
const fileName = 'taskConfig.json';

const options = yargs
    .usage("Usage -n <name>")
    .option("a", { alias: "action", describe: "Execute/Status/Summary", type: "string", demandOption: true})
    .option("p", { alias: "filepath", describe: "Path of JSON task file", type: "string", demandOption: false})
    .option("c", { alias: "concurrency", describe: "Number of concurrent calls", type: "number", demandOption: false})
    .option("t", { alias: "taskId", describe: "Task Id", type: "string", demandOption: false})
    .argv;

switch (options.action) {
  case 'Execute':
  case 'execute':
    execute(_.get(options, 'filepath', ''), _.get(options, 'concurrency', 1), fileName);
    break;
  case 'Status':    
  case 'status':
    query('status', options.taskId, fileName);;
    break;
  case 'Summary':
  case 'summary':
    query('summary', options.taskId, fileName);;
    break;
  default:
    return 'no parameters passed';
};
