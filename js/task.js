function TaskList() {
}

TaskList.tasks = new Array();

TaskList.parseTasks = function(json) {	
	rr = eval(json);
	for(var i = 0 ; rr[i]!=null; i++) {		
		id = rr[i].id;
		name = rr[i].name;
		
		user = rr[i].user;
		sprintdate = rr[i].sprintdate;
		completiondate = rr[i].sprintdate;
		idproj = rr[i].idproj;
		idsprint = rr[i].idsprint;
		priority = parseInt(rr[i].priority);
		effort = parseInt(rr[i].effort);
		t = new Task(id,name,user,sprintdate,completiondate,idproj,idsprint,priority,effort);
		TaskList.tasks.push(t);
	}
}

TaskList.getTasksProject = function(idproj) {
	$.ajax({
		type: 'POST',
		url: 'ajax/getTasksProject.php',
		data: { idproj: idproj },
		success: this.parseTasks,
		error: function(){
			console.log('error in getTasksProject');
		}
	});
	return TaskList.tasks;
}

TaskList.getTasksUser = function(user) {
	$.post("ajax/getTasksUser.php",
			{ user: user },
			this.parseTasks);
	return this.tasks; 
}

function Task(id,name,user,sprintdate,completiondate,idproj,idsprint,priority,effort) {
	this.id = id;
	this.name = name;
	this.user = user;
	this.sprintdate = sprintdate;
	this.completiondate = completiondate;
	this.idproj = idproj;
	this.idsprint = idsprint;
	this.priority = priority;
	this.effort = effort;
		
	this.addTask = function() {
		var new_id;
		$.ajax({
			type: 'POST',
			url: 'ajax/addTask.php',
			async: false,
			data: {
					name: this.name,
					user: this.user,
					sprintdate: this.sprintdate,
					completiondate: this.completiondate,
					idproj: this.idproj,
					idsprint: this.idsprint,
					priority: this.priority,
					effort: this.effort
				},
			success: function(json){
					// retornar o id da nova task que o script retorna
					// console.log(json);
					new_id = json;
				}
		});
		this.id = new_id;
	}
	
	this.saveTask = function() { 
		$.ajax({
			type: 'POST',
			url: 'ajax/saveTask.php',
			data: {
					id: this.id,
					name: this.name,
					user: this.user,
					sprintdate: this.sprintdate,
					completiondate: this.completiondate,
					idproj: this.idproj,
					idsprint: this.idsprint,
					priority: this.priority,
					effort: this.effort
				  },
			success: function() {
					},
			error: function(){
				alert("Error in getTasksProject");
			}
		});
	}
}
