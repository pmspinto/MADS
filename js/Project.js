var superDuperMegaProject = null;

function parseTasks(json, proj) {
    rr = eval(json);
    for(var i = 0 ; rr[i]!=null; i++) {
        id = rr[i].id;
        name = rr[i].name;
        
        user = rr[i].user;
        idproj = rr[i].idproj;
        idsprint = rr[i].idsprint;
        sprintdone = rr[i].sprintdone;
        priority = parseInt(rr[i].priority);
        effort = parseInt(rr[i].effort);
        t = new Task(id,name,user,idproj,idsprint,sprintdone,priority,effort);
        proj.tasks.push(t);
    }
    
}

function parseProjectInfo(json){

	console.log("dentro do parse do project");
	console.log(json);
	data = JSON.parse(json);
	console.log(data);

	// the project info
	superDuperMegaProject.name = data.name;
	superDuperMegaProject.email = data.email;
	superDuperMegaProject.creationDate = data.creationdate;
	superDuperMegaProject.description = data.description;
	
	// the project users
	for(i in data.users)
		superDuperMegaProject.users[data.users[i]["email"]] = data.users[i]["name"];
}

function Project(id) {
	this.id = id;
	
	this.tasks = new Array();
	this.users = new Array();
	
	this.loadProjInfo = function() {
		console.log('inside loadProjInfo');
		superDuperMegaProject = this;
		$.ajax({
			async: false,
			type: 'POST',
			url: Config.server + 'ajax/loadProjectInfo.php',
			data : {projectID: this.id},
			success: function(data){
				parseProjectInfo(data);
			},
			error: function(){
					console.log("error loading project info");
			}
		});
		console.log(superDuperMegaProject.creationDate);
		console.log(superDuperMegaProject.users);
	}
    
    this.loadProjTasks = function() {
        $.ajax({
            type: 'POST',
            url: Config.server + 'ajax/getTasksProject.php',
            data: { idproj: this.id },
            success: function(data){
                parseTasks(data, currentProject);
            },
            error: function(){
                console.log('error in getTasksProject');
            }
        });
    }
    
}
