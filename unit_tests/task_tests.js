function tasksProject(){
	
	// the project
	var idProject = 2;

	// set as sync, call and set as async
	$.ajaxSetup({async:false});
	TaskList.getTasksProject(idProject);
	$.ajaxSetup({async:true});

	var tasksIDs = [];

	for(i in TaskList.tasks)
		tasksIDs.push(TaskList.tasks[i].id);
	

	// test the value
	expect(2);
	deepEqual(tasksIDs, new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'), "These are the tasks for project " + idProject);
	equals(TaskList.tasks.length, 10, "The number of tasks in project " + idProject);
}

function tasksUser(){
	
	// the project
	var userEmail = "mads@fe.up.pt";

	// test the value
	expect(1);
	ok(true, "just a stub for " + userEmail);
	

}
