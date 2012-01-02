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
	
	this.getSprints = function() {
		sprints = new Array();
		var spr = new Array();
		var effort = new Array();
		var annot = new Array();
		var max = -10000000;
		var min = 10000000;
		
		//console.log("Tasks: "+this.tasks);
		//get min max
		for(var j=0; j<this.tasks.length; j++) {
			if(this.tasks[j].effort < min)
				min = this.tasks[j].effort;
			if(this.tasks[j].effort > max)
				max = this.tasks[j].effort;	
		}
		
		var d = 1-min;
		var s = (this.maxeffort-1)/(max-min);
		var sum = 0;
		
		//get regularized sum
		for(var j=0; j<this.tasks.length; j++) {
			sum += (this.tasks[j].effort+d)*s+1;
			//console.log('Task :' + this.tasks[j].sprintdone);
			//console.log("Task normal: "+this.tasks[j].effort);
			//console.log("Tasks normalized: "+((this.tasks[j].effort+d)*s+1));
		}
		
		//get sprint, effort and annotations
		spr[0] = 0;
		effort[0] = sum;
		annot[0] = [];
		for(var i=1; i<=this.currentSprint; i++) {
			spr[i] = i; //sprint (xx)
			a = new Array(); //annotations
			var asum = 0;
			for(var j=0; j<this.tasks.length; j++) {
				if(this.tasks[j].sprintdone == i) {
					a.push(this.tasks[j].name);
					asum += (this.tasks[j].effort+d)*s+1;
				}
			}
			annot[i] = a;
			effort[i] = effort[i-1] - asum;
		}
		
		//console.log(annot);
		sprints['sprint'] = spr;
		sprints['effort'] = effort;
		sprints['annotations'] = annot;
		return sprints;
	}
	
	this.getVelocity = function() {
		
		var spr = new Array();
		var velo = new Array();
		
		var max = -10000000;
		var min = 10000000;
		
		//console.log("Tasks: "+this.tasks);
		//get min max
		for(var j=0; j<this.tasks.length; j++) {
			if(this.tasks[j].effort < min)
				min = this.tasks[j].effort;
			if(this.tasks[j].effort > max)
				max = this.tasks[j].effort;	
		}
		
		var d = 1-min;
		var s = (this.maxeffort-1)/(max-min);
		
		//get sprint and velocity
		spr[0] = 0;
		var acc = 0;
		for(var i=1; i<=this.currentSprint; i++) {
			spr[i] = i; //sprint (xx)
			var asum = 0;
			for(var j=0; j<this.tasks.length; j++)
				if(this.tasks[j].sprintdone == i)
					asum += (this.tasks[j].effort+d)*s+1;
			velo[i] = asum;
			acc += asum;
		}
		
		velo[0] = acc/this.currentSprint;
		
		//console.log(spr);
		//console.log(velo);
		
		var velocity = new Array();
		velocity['sprint'] = spr;
		velocity['velocity'] = velo;

		return velocity;
	}
}

function parseProjectInfo(json, proj) {
	//console.log("json: "+json);
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
