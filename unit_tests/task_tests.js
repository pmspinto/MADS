currentProject = new Project(2);

function tasksProject() {
	// set as sync, call and set as async
	$.ajaxSetup({async:false});
	currentProject.loadProjTasks();
	$.ajaxSetup({async:true});

	console.log(currentProject.tasks.length);

	var tasksIDs = [];

	for(i in currentProject.tasks)
		tasksIDs.push(currentProject.tasks[i].id);
	

	// test the value
	expect(2);
	deepEqual(tasksIDs, new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'), "These are the tasks for project " + currentProject.id);
	equals(currentProject.tasks.length, 10, "The number of tasks in project " + currentProject.id);
}

function tasksUser(){
	
	// the project
	var userEmail = "mads@fe.up.pt";

	// test the value
	expect(1);
	ok(true, "just a stub for " + userEmail);
	

}
