var canvas_icon_width = 15;
var canvas_icon_height = 15;
var canvas_factor = 1;

var width = 150;
var	height = 150;

var zoom = 0;
var centerx = 0;
var centery = 0;

var supress = false; // dragging single task
var px = -1, py = -1; // previous
var move = false; // in motion (canvas)

var sprint = 1;

function canvasInit(tasks) {		
	for(var i = 0; currentProject.tasks[i]!=null; i++) {
		if (currentProject.tasks[i].sprintdone == 0)
			create_postit(currentProject.tasks[i]);
	}
	
	/** EVENTOS ASSOCIADOS AO WHITEBOARD
	*	DOUBLECLICK, MOUSEWHEEL, MOUSEUP, MOUSEDOWN e MOUSEMOVE **/
	
	// Criar uma task nova
	$('#whiteboard').dblclick(function(ev) {
		// É necessário pedir a' BD que crie uma nova task para atribuir um id
		// Da-se um id dummy ao construtor que depois é actualizado no addTask()
		// TODO - NECESSARIO DESCOBRIR:
		// NECESSARIO DESCOBRIR:
		// User, id do projecto, id do sprint e effort e priority dependendo de onde foi clickado
		
		new_effort = centerx + (ev.pageX - largura/2)/canvas_factor;
		new_priority = centery + (ev.pageY - altura/2)/canvas_factor;
				
		new_task = new Task(0, "Set content", "mads@fe.up.pt", currentProject.id, 0, 0, new_priority, new_effort);
		new_task.addTask();
		currentProject.tasks.push(new_task);
		
		// Create the post-it
		// Get the click position
		// console.log(ev.pageX + " " + ev.pageY);
		
		create_postit(new_task);
	});
	
	// Scroll, zoom-in e zoom-out
	$('#whiteboard').bind('mousewheel', function(e) {
		if (!move && !supress) {
			if(e.wheelDelta > 0)
				zoom--;
			else 
				zoom++;
			
			canvas_factor = Math.pow(0.8, zoom);
			
			for(var i = 0; currentProject.tasks[i]!=null; i++) {
				if (currentProject.tasks[i].drawn == true) {
					newheight = canvas_factor*height;
					newwidth = canvas_factor*width;
					resize_postit(newheight,newwidth,currentProject.tasks[i]);
				}
			}
		}
		
	});
		

	// Mover os post-its
	$('#whiteboard').mousedown(function(e) {
        e.preventDefault();
		if (supress) {
			supress = false;
			px = -1;
		}
		else {
			move = true;
			px = e.pageX - this.offsetLeft;
			py = e.pageY - this.offsetTop;
		}
	});
	
	// Move os post-its
	$('#whiteboard').mousemove(function(ev) {
		if (move && !supress && altura != ev.pageY+1) {
			for(var i = 0; currentProject.tasks[i]!=null; i++) {
				if (currentProject.tasks[i].drawn == true) {
					startpos = $("#"+currentProject.tasks[i].id).position();
					$("#"+currentProject.tasks[i].id).css({"left": (startpos.left + ev.pageX - this.offsetLeft - px) + "px",
											"top": (startpos.top + ev.pageY - this.offsetTop - py) + "px"}); 
				}
			}
			centerx -= (ev.pageX - this.offsetLeft - px)/canvas_factor;
			centery -= (ev.pageY - this.offsetTop - py)/canvas_factor;
		
			px += (ev.pageX - this.offsetLeft - px);
			py += (ev.pageY - this.offsetTop - py);
		}
	});
	
	$('#whiteboard').mouseup(function(ev) {
		move = false;
	});
	
	$('#whiteboard').mouseout(function(ev) {
		move = false;
	});
}
	
// MISC FUNCTIONS
	
// Returns the index of the correspondent task id
function get_task_index(task_id) {
	for (var j = 0; currentProject.tasks[j] != null; j++)
		if (currentProject.tasks[j].id == task_id)
			return j;
	return null;
}

function resize_postit(newheight,newwidth,task){
	//Resize the post it
	$("#"+task.id).css( { 
		'width': newwidth,
		'height': newheight,
		'font-size': canvas_factor*100+'%',
		'left': ((task.effort-centerx)*canvas_factor + largura/2 - newwidth/2)+'px',
		'top': ((task.priority-centery)*canvas_factor + altura/2 - newheight/2)+'px'
	});
	// Resize the icons
	$('#close_'+task.id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
	$('#check_'+task.id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
	$('#sprint_'+task.id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
}

function destroy_postit(task) {
	$('#'+task.id).remove();
}

// Creates the post it
function create_postit(task){
	task.drawn = true;
		
	$("#whiteboard").append('<div id="' + task.id + '">' +
								'<img id="close_' + task.id + '" title="Delete task" src="css/images/delete_icon.png" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<img id="check_' + task.id + '" title="Mark as done" src="css/images/' + taskdone_path(task.sprintdone) + '" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<img id="sprint_' + task.id + '" title="Add to the current sprint" src="css/images/' + addtosprint_path(task.idsprint) + '" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<div id="content_'+ task.id+'" >' + task.name + '</div>' +
							"</div>");
	$("#"+task.id).draggable({ scroll: false , scrollSensitivity: 100, containment: 'parent' });
	define_postit_css(task, task.priority,task.effort);
	bind_mouse_events(task);
}
		
function define_postit_css(task, priority,effort){
	$("#"+task.id).css({ 
		'width' : (width*canvas_factor)+'px' , 
		'height': (height*canvas_factor)+'px' , 
		'padding' : '0.5em', 
		'position':'absolute', 
		'font-size': canvas_factor*100+'%',
		'top':((priority-centery)*canvas_factor + altura/2 - canvas_factor*width/2)+'px', 
		'left':((effort-centerx)*canvas_factor + largura/2 - canvas_factor*width/2)+'px'});
	setTaskClass(task);
}

// EVENTOS DOS POST ITs
function bind_mouse_events(task){
	$('#'+task.id).mousedown(function(e) {
		supress = true;
		px = -1;
	});
	
	$('#'+task.id).mouseup(function(e) {
		// update locally
		
		endpos = $('#'+task.id).position();
		
		task.effort += (endpos.left - ((task.effort-centerx)*canvas_factor + largura/2 - canvas_factor*width/2))/canvas_factor;
		task.priority += (endpos.top - ((task.priority-centery)*canvas_factor + altura/2 - canvas_factor*height/2))/canvas_factor;
		// update priority & effort in DB
		task.saveTask();
	});
	
	// Define double click event to edit the text in the task
	$('#content_'+task.id).editable('ajax/updateTaskName.php',{
			event: "dblclick",
			onblur: "cancel",
			select: "true",
			// style: "opacity: 0.5;",
			style: "inherit",
			indicator : 'Saving...',
			tooltip : 'Double click to edit...',
			cancel : 'Cancel',
			submit : 'OK'
			// type: "textarea"
	});
	
	// Mouse over the post it, show and hide the top right icons
	$('#'+task.id).hover(
		function(){
			// console.log("entrei no hover");
			$("#close_"+task.id).css({"visibility":"visible"});
			$("#check_"+task.id).css({"visibility":"visible"});
			$("#sprint_"+task.id).css({"visibility":"visible"});
		},
		function(){
			// console.log("sai do hover");
			$("#close_"+task.id).css({"visibility":"hidden"});
			$("#check_"+task.id).css({"visibility":"hidden"});
			$("#sprint_"+task.id).css({"visibility":"hidden"});
		}
	);
	
	// Set the actions for the icons
	// Delete task
	$('#close_'+task.id).click(function(e){
		// First, delete the task on the database
		task.deleteTask();
		
		// Now, remove the corresponding post it
		// $('#'+task_id).fadeOut();
		$('#'+task.id).remove();
	});
	
	// To be done in this sprint
	$('#sprint_'+task.id).click(function(e) {		
		sprint = ((currentProject.currentSprint == task.idsprint)? 0 : currentProject.currentSprint);
		task.idsprint = sprint;
		task.saveTask();
		
		// Change the icon image
		$(this).attr("src","css/images/" + addtosprint_path(task.idsprint));
		
		setTaskClass(task);
	});
	
	// Set as done
	$('#check_'+task.id).click(function(e){
		sprint = ((task.sprintdone == 0)? currentProject.currentSprint : 0);
		task.sprintdone = sprint;
		task.saveTask();		
		
		if (document.menuform.filter_done.checked == false && task.sprintdone > 0) {
			destroy_postit(task);
			task.drawn = false;
		}
		
		// Change the icon
		$(this).attr("src","css/images/" + taskdone_path(sprint));
		
		// change the image
		setTaskClass(task);
	});
}

// Returns a string representing the path to the "Add to sprint/Remove from sprint" image
// Receives the task 
function addtosprint_path(idsprint){
	if(idsprint == 0)
		return "add_to_sprint.png";
	else return "remove_from_sprint.png";
}

function taskdone_path(sprintdone){
	if(sprintdone == 0)
		return "check_icon.png";
	else return "uncheck_icon.png";
}

function setTaskClass(task) {
	if (task.sprintdone > 0) {
		$('#'+task.id).removeClass("postit");
		$('#'+task.id).removeClass("postitsprint");
		$('#'+task.id).addClass("postitdone");
	}
	else if (task.idsprint > 0) {
		$('#'+task.id).removeClass("postit");
		$('#'+task.id).removeClass("postitdone");
		$('#'+task.id).addClass("postitsprint");
	}
	else {
		$('#'+task.id).removeClass("postitsprint");
		$('#'+task.id).removeClass("postitdone");
		$('#'+task.id).addClass("postit");
	}
}

function filterByDone() {
	if (document.menuform.filter_done.checked == true) {
		for (var i = 0; currentProject.tasks[i] != null; i++)
			if (currentProject.tasks[i].drawn == false) {
				create_postit(currentProject.tasks[i]);
				currentProject.tasks[i].drawn = true;
			}
	}
	else {
		for (var i = 0; currentProject.tasks[i] != null; i++)
			if (currentProject.tasks[i].drawn == true && currentProject.tasks[i].sprintdone > 0) {
				destroy_postit(currentProject.tasks[i]);
				currentProject.tasks[i].drawn = false;
			}
	}
}	
