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

function Project(id) {
    this.id = id;
    
    this.tasks = new Array();
    
    this.loadProjInfo = function() {
        console.log('loadProjInfo not done yet');
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