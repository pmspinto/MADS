function Task(id,name,user,idproj,idsprint,sprintdone,priority,effort) {
	this.id = id;
	this.name = name;
	this.user = user;
	this.idproj = idproj;
	this.idsprint = idsprint;
	this.sprintdone = sprintdone;
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
					idproj: this.idproj,
					idsprint: this.idsprint,
					sprintdone: this.sprintdone,
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
					idproj: this.idproj,
					idsprint: this.idsprint,
					sprintdone: this.sprintdone,
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
