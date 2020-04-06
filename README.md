# execute-task-cli-app
This can be used to run multiple tasks defined in a config file

## Instructions
- Use ```npm i``` to install dependencies
- Use ```npm install .``` to install the app or ```npm install -g .``` to install it globally
- Use ```executeTask``` command to see the options available.
    - Available Options are
        - ```a: action``` is a required option. It can have values as Execute, Status or Summary
        - ```p: file path``` is path of the file to be used for tasks, it is optional field and is needed with action. If p is not provided, code will use sample file from the code base (/src/input/files/test_config.json)
        - ```c: concurrency``` is to give concurrency to be used for running the tasks, default will be 1
        - ```t: task Id``` is for task Id, it is required with summary or status actions. It gives the status/summary of the given tasks
- Examples of command:
    - ```executeTask -a Execute -c 2``` - will create the taskConfig from the test_config file and execute the tasks
    - ```executeTask -a Execute -c 2 -p "/Users/aakhauri/anish-project/test.json"``` - will create the taskConfig from the file present at given location and then execute each task
    - ```executeTask -a Status -t "Task-1"```- gives the status of the task mentioned.
    - ```executeTask -a Summary -t "Task-1"```- gives the summary of the task mentioned.

## Folder structure details

| short name | path | details |
| --- | --- | --- |
| root | ./src | source code, stores index.js, execute and query functionalties |
| config | {root}/config/config.json | stores the configuration of each tasks. |
| execution | {root}/execution/default.js | this is the main file that performs the execution. It gets the method to be executed from the config and then calls the required method |
| task | {root}/task/default.js | this is where the each tasks functionality will be defined. |
| input | {root}/inputs/files | folder for the input file taskConfig.json which is generated based on the config file provided sample available in test_config.json under {root}/inputs/files |
| output | {root}/taskResults | folder for all the output files for the task execution. It will have one json file for each task alongwith a allResults file which stores success and failure messages for all tasks |

# How to Add new tasks

Add the new task configuration into ```src/config/config.json``` file, as shown below:
```
[
    {
        "taskName": "Delay Task",
        "taskDescription": "Delay task for given time, then show success or failure",
        "taskMethod": "delayTask",
        "config": [
            "time",
            "result"
        ]
    }
]
```
Then add the functionality in ```src/task/default.js```. Just make sure the name of the method in ```default.js``` should be same as mentioned in config file under ```taskMethod```. That's all. When you give the Task name as mentioned in the config, it will start executing the functionality automatically.
