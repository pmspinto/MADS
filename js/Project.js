function Project(id) {
    this.id = id;
	this.name = "Project Name";
	this.description = "Project description"
	
	this.users = new Array();
    
    this.tasks = new Array();
	this.currentSprint = 1;
	this.maxeffort = 5;
    
    this.loadProjInfo = function() {
        $.ajax({
            type: 'POST',
            url: Config.server + 'ajax/getProjectInfo.php',
            data: { idproj: this.id },
            success: function(data){
                parseProjectInfo(data, currentProject);
            },
            error: function(){
                console.log('error in getProjectInfo');
            }
        });
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
	
	this.saveBasicProjectInfo = function() {
		$.ajax({
            type: 'POST',
            url: Config.server + 'ajax/setprojectbasicinfo.php',
            data: { idproj: this.id, name: this.name, description: this.description, maxeffort: this.maxeffort},
            success: function(data){
                updatedialog();
            },
            error: function(){
                console.log('error in getTasksProject');
            }
        });
	}
	
	this.removeUser = function(email) {
		$.ajax({
            type: 'POST',
            url: Config.server + 'ajax/removeprojectmember.php',
            data: { idproj: this.id, email: email},
            success: function(data){
				updatedialog();
            },
            error: function(){
                console.log('error in getTasksProject');
            }
        });
	}
}

function parseProjectInfo(json, proj) {
	console.log("json: "+json);
	rec = JSON.parse(json);
	//console.log(rec);
	proj.name = rec.name;
	proj.description = rec.description;
	proj.currentSprint = rec.currentsprint;
	proj.maxeffort = rec.maxeffort;
	proj.users = rec.users;
	
	//console.log(proj);
	updatedialog();
}

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
