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
			create_postit(i);
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
		
		create_postit(currentProject.tasks.length - 1);
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
					resize_postit(newheight,newwidth,i);
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

function resize_postit(newheight,newwidth,i){
	//Resize the post it
	$("#"+currentProject.tasks[i].id).css( { 
		'width': newwidth,
		'height': newheight,
		'font-size': canvas_factor*100+'%',
		'left': ((currentProject.tasks[i].effort-centerx)*canvas_factor + largura/2 - newwidth/2)+'px',
		'top': ((currentProject.tasks[i].priority-centery)*canvas_factor + altura/2 - newheight/2)+'px'
	});
	// Resize the icons
	$('#close_'+currentProject.tasks[i].id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
	$('#check_'+currentProject.tasks[i].id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
	$('#sprint_'+currentProject.tasks[i].id).css( {
		'width': canvas_icon_width*canvas_factor,
		'height': canvas_icon_height*canvas_factor
	});
}

// Creates the post it
function create_postit(i){	
	var postitclass;
	if (currentProject.tasks[i].sprintdone > 0)
		postitclass = "postitdone";
	else
		postitclass = "postit";
		
	currentProject.tasks[i].drawn = true;
		
	$("#whiteboard").append('<div id="' + currentProject.tasks[i].id + '" class="'+postitclass+'">' +
								'<img id="close_' + currentProject.tasks[i].id + '" title="Delete task" src="css/images/delete_icon.png" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<img id="check_' + currentProject.tasks[i].id + '" title="Mark as done" src="css/images/' + taskdone_path(currentProject.tasks[i].sprintdone) + '" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<img id="sprint_' + currentProject.tasks[i].id + '" title="Add to the current sprint" src="css/images/' + addtosprint_path(currentProject.tasks[i].idsprint) + '" height="' + canvas_icon_height*canvas_factor + '" width="' + canvas_icon_width*canvas_factor + '" style="float:right; visibility:hidden;"/>' +
								'<div id="content_'+currentProject.tasks[i].id+'" >' + currentProject.tasks[i].name + '</div>' +
							"</div>");
	$("#"+currentProject.tasks[i].id).draggable({ scroll: false , scrollSensitivity: 100, containment: 'parent' });
	define_postit_css(i, currentProject.tasks[i].priority,currentProject.tasks[i].effort);
	bind_mouse_events(currentProject.tasks[i].id);
}
		
function define_postit_css(i, priority,effort){
	$("#"+currentProject.tasks[i].id).css({ 
		'width' : (width*canvas_factor)+'px' , 
		'height': (height*canvas_factor)+'px' , 
		'padding' : '0.5em', 
		'position':'absolute', 
		'top':((priority-centery)*canvas_factor + altura/2 - canvas_factor*width/2)+'px', 
		'left':((effort-centerx)*canvas_factor + largura/2 - canvas_factor*width/2)+'px'});
}

// EVENTOS DOS POST ITs
function bind_mouse_events(task_id){
	$('#'+task_id).mousedown(function(e) {
		supress = true;
		px = -1;
	});
	
	$('#'+task_id).mouseup(function(e) {
		// update locally
		var j = get_task_index(this.id);
		
		endpos = $('#'+this.id).position();
		
		currentProject.tasks[j].effort += (endpos.left - ((currentProject.tasks[j].effort-centerx)*canvas_factor + largura/2 - canvas_factor*width/2))/canvas_factor;
		currentProject.tasks[j].priority += (endpos.top - ((currentProject.tasks[j].priority-centery)*canvas_factor + altura/2 - canvas_factor*height/2))/canvas_factor;
		// update priority & effort in DB
		currentProject.tasks[j].saveTask();
	});
	
	// Define double click event to edit the text in the task
	$('#content_'+task_id).editable('ajax/updateTaskName.php',{
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
	$('#'+task_id).hover(
		function(){
			// console.log("entrei no hover");
			$("#close_"+task_id).css({"visibility":"visible"});
			$("#check_"+task_id).css({"visibility":"visible"});
			$("#sprint_"+task_id).css({"visibility":"visible"});
		},
		function(){
			// console.log("sai do hover");
			$("#close_"+task_id).css({"visibility":"hidden"});
			$("#check_"+task_id).css({"visibility":"hidden"});
			$("#sprint_"+task_id).css({"visibility":"hidden"});
		}
	);
	
	// Set the actions for the icons
	// Delete task
	$('#close_'+task_id).click(function(e){
		// First, delete the task on the database
		currentProject.tasks[get_task_index(task_id)].deleteTask();
		
		// Now, remove the corresponding post it
		// $('#'+task_id).fadeOut();
		$('#'+task_id).remove();
	});
	
	// To be done in this sprint
	$('#sprint_'+task_id).click(function(e){
		// Get the task index
		index = get_task_index(task_id);
		
		sprint = ((currentProject.currentSprint == currentProject.tasks[index].idsprint)? 0 : currentProject.currentSprint);
		
		// Make necessary changes on the DB
		// console.log("Vou chamar o set task sprint para a task (" + task_id + "," + currentProject.tasks[index].name + ") com index = " + index + " e o sprint = " + sprint);
		set_task_sprint(task_id,sprint);
		
		// Make changes locally
		currentProject.tasks[index].idsprint = sprint;
		
		// Change the icon image
		$(this).attr("src","css/images/" + addtosprint_path(currentProject.tasks[index].idsprint));
	});
	
	// Set as done
	$('#check_'+task_id).click(function(e){
		// Get the task index
		index = get_task_index(task_id);
		
		// Make necessary changes on the DB
		sprint = ((currentProject.tasks[index].sprintdone == 0)? currentProject.currentSprint : 0);
		set_task_done(task_id,sprint);
		
		// Make changes locally
		currentProject.tasks[index].sprintdone = sprint;
		
		// Change the icon
		$(this).attr("src","css/images/" + taskdone_path(sprint));
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

function filterByDone() {
	if (document.menuform.filter_done.checked == true) {
		for (var i = 0; currentProject.tasks[i] != null; i++)
			if (currentProject.tasks[i].drawn == false)
				create_postit(i);
	}
	else {
	}
}	
