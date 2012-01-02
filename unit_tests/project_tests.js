// load the info of the project with id=2 and compare it
function loadProjInfoTest(){

	// load the info for project with id 2
	$.ajaxSetup({async:false});
	currentProject.id = 2;
	currentProject.loadProjInfo();
	$.ajaxSetup({async:true});

	
	console.log(currentProject);

	// test the project info, some tasks and the users
	expect(14);
	equals(currentProject.id, 2, "The id");
	equals(currentProject.name, "MADS", "The project name");
	equals(currentProject.currentSprint, 1, "The current sprint");
	equals(currentProject.description, "", "The project description should be empty");

	equals(currentProject.tasks[0].name, "Criar Login", "The name of the 1st task");
	equals(currentProject.tasks[0].effort, 433, "The effort of the 1st task");
	equals(currentProject.tasks[3].name, "Listar Projeto", "The name of the 4th task");
	equals(currentProject.tasks[3].effort, -233, "The effort of the 4th task");
	equals(currentProject.tasks[6].name, "Backlog Lista", "The name of the 7th task");
	equals(currentProject.tasks[6].effort, -469, "The effort of the 7th task");

	equals(currentProject.users[0].email, "joaonice@gmail.com", "The email of the 1st user");
	equals(currentProject.users[0].name, "j", "The name of the 1st user");
	equals(currentProject.users[1].email, "mads@fe.up.pt", "The email of the 2nd user");
	equals(currentProject.users[1].name, "MADS 2011", "The name of the 2nd user");

}

// change the info, save and then load it from the DB and check it
function saveBasicProjectInfoTest(){
	
	// the test data
	var originalName = 'original project';
	var changedName = 'changed project';

	var originalDescription = 'original project description';
	var changedDescription = 'changed project description';

	currentProject.id = 2;
	currentProject.name = originalName;
	currentProject.description = originalDescription;
	
	expect(4);
	// the original information
	equals(currentProject.name, originalName, 'The first name is ´' + originalName + '´');
	equals(currentProject.description, originalDescription, 'The first description is ´' + originalDescription + '´');
	
	// change the info
	currentProject.name = changedName;
	currentProject.description = changedDescription;

	// save the info
	$.ajaxSetup({async:false});
	currentProject.saveBasicProjectInfo();
	$.ajaxSetup({async:true});

	// load the project info
	$.ajaxSetup({async:false});
	currentProject.loadProjInfo();
	$.ajaxSetup({async:true});

	// the changed information
	equals(currentProject.name, changedName, 'The first name was ´' + originalName + '´ and the updated name should be ´' + changedName + '´');
	equals(currentProject.description, changedDescription, 'The first description was ´' + originalDescription + '´ and the updated description should be ´' + changedDescription + '´');
}


// remove one user from the project and the load it from the DB and see if the user was removed
function removeUserTest(){

	// load the info for project with id 2
	$.ajaxSetup({async:false});
	currentProject.id = 2;
	currentProject.loadProjInfo();
	$.ajaxSetup({async:true});

	expect(8);
	// show the current users of project 2
	equals(currentProject.users.length, 2, "The number of user of the project with id " + currentProject.id + " before removing one of them")
	equals(currentProject.users[0].email, "joaonice@gmail.com", "The email of the 1st user");
	equals(currentProject.users[0].name, "j", "The name of the 1st user");
	equals(currentProject.users[1].email, "mads@fe.up.pt", "The email of the 2nd user");
	equals(currentProject.users[1].name, "MADS 2011", "The name of the 2nd user");

	// remove the user mads@fe.up.pt
	$.ajaxSetup({async:false});
	currentProject.removeUser("mads@fe.up.pt");
	$.ajaxSetup({async:true});

	// load the info for project with id 2
	$.ajaxSetup({async:false});
	currentProject.loadProjInfo();
	$.ajaxSetup({async:true});

	// show the current user of project 2
	equals(currentProject.users.length, 1, "The number of user of the project with id " + currentProject.id + " after removing mads@fe.up.pt")
	equals(currentProject.users[0].email, "joaonice@gmail.com", "The email of the 1st user");
	equals(currentProject.users[0].name, "j", "The name of the 1st user");
}
