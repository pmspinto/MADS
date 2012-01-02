var currentProject = new Project(2);

function tasksProject() {
	// set as sync, call and set as async
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});

	var tasksIDs = [];

	for(i in currentProject.tasks)
		tasksIDs.push(currentProject.tasks[i].id);
	

	// test the value
	expect(2);
	deepEqual(tasksIDs, new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'), "These are the tasks for project " + currentProject.id);
	equal(currentProject.tasks.length, 10, "The number of tasks in project " + currentProject.id);

}



// adds a new task, receives the id of the inserted tasks and checks the DB for a tasks with that id
function addTask(){
	// the test data
	var testID = 0;
	var task = new Task(testID, 'testTask', 'mads@fe.up.pt', 2, 0, 0, 88, 99);

	// add the task
	$.ajaxSetup({async:false});
	task.addTask();
	$.ajaxSetup({async:true});

	// get all the tasks for project 2 and check that the new inserted task is there
	// set as sync, call and set as async
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});


	// get the last task
	var testTask = currentProject.tasks[currentProject.tasks.length-1];

	// check to see if this is the task that we want
	expect(5);
	notEqual(task.id, testID, 'After the insertion, the task id is ' + task.id + ' and the test id is ' + testID);
	equal(testTask.name, 'testTask', 'The name of the task');
	equal(testTask.idproj, '2', 'The id of the project this task belong to');
	equal(testTask.effort, 99, 'The effort of this task');
	equal(testTask.priority, 88, 'The priority of this task');

}

// changes a task and saves the task to the db, then sees if the task is updated correctly
function saveTask(){
	// the test data
	var testID = -1;
	var testName = 'originalName';
	var changedName = 'changedName';
	var task = new Task(testID, testName, 'mads@fe.up.pt', 2, 0, 0, 88, 99);

	// add the task and check that the task changed
	$.ajaxSetup({async:false});
	task.addTask();
	$.ajaxSetup({async:true});

	expect(3);
	notEqual(task.id, testID, 'After the insertion, the task id is ' + task.id + ' and the test id is ' + testID);

	// change the name
	task.name = changedName;
	// save the task
	$.ajaxSetup({async:false});
	task.saveTask();
	$.ajaxSetup({async:true});
	// download the task and see if the name is changed
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});

	// get the last task
	var testTask = currentProject.tasks[currentProject.tasks.length-1];

	equal(task.id, testTask.id, 'The id of the local task and the id of the remote task');
	equal(testTask.name, changedName, 'The name of the task was initially ´' + testName + '´ and now is ´' + changedName + '´');	
	

}

// create a task, check that it is on the db
// delete that task, check that it's not on the db
function deleteTask(){
	// the test data
	var testID = 1337;
	var testName = 'task to be deleted';
	var task = new Task(testID, testName, 'mads@fe.up.pt', 2, 0, 0, 88, 99);

	// add the task
	$.ajaxSetup({async:false});
	task.addTask();
	$.ajaxSetup({async:true});
	expect(3);
	notEqual(task.id, testID, 'After the insertion, the task id is ' + task.id + ' and the test id is ' + testID);

	// download the tasks
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});

	// get the last task
	var testTask = currentProject.tasks[currentProject.tasks.length-1];

	// see the name
	equal(testTask.name, testName, 'The name of the last task on this project');	

	// delete the task
	$.ajaxSetup({async:false});
	task.deleteTask();
	$.ajaxSetup({async:true});

	// download the tasks again
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});

	// get the last task
	testTask = currentProject.tasks[currentProject.tasks.length-1];

	// see the name
	notEqual(testTask.name, testName, 'The name of the last task on this project shouldn´t be ´' + testName + '´');	

}
