# execute-task-cli-app
This can be used to run multiple tasks defined in a config file

## Instructions
- Use ```npm run start``` to run the tool.
    - It runs the ```execute.js``` file which requires an input configuration file to be specified and an execution method.
- Use ```npm run generate``` to use input generating scripts located in the ```input``` file to generate input configuration files located in ```input/files```.

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

