function canvasInit(tasks) {	
	var zoom = 0;
	var centerx = 0;
	var centery = 0;
	
	var width = 150;
	var	height = 150;
	var icon_width = 15;
	var icon_height = 15;
	
	var supress = false; // dragging single task
	var px = -1, py = -1; // previous
	var move = false; // in motion (canvas)
	var factor = 1;
	
	var sprint = 1;
	
	for(var i = 0; currentProject.tasks[i]!=null; i++)
		create_postit(i);
		
	for (var i = 0; currentProject.tasks[i]!=null; i++)
		bind_mouse_events(currentProject.tasks[i].id);
	
	/** EVENTOS ASSOCIADOS AO WHITEBOARD
	*	DOUBLECLICK, MOUSEWHEEL, MOUSEUP, MOUSEDOWN e MOUSEMOVE **/
	
	// Criar uma task nova
	$('#whiteboard').dblclick(function(ev) {
		// � necess�rio pedir a' BD que crie uma nova task para atribuir um id
		// Da-se um id dummy ao construtor que depois � actualizado no addTask()
		// TODO - NECESSARIO DESCOBRIR:
		// NECESSARIO DESCOBRIR:
		// User, id do projecto, id do sprint e effort e priority dependendo de onde foi clickado
		
		new_effort = centerx + (ev.pageX - largura/2)/factor;
		new_priority = centery + (ev.pageY - altura/2)/factor;
				
		new_task = new Task(0, "Set content", "mads@fe.up.pt", 2, 0, 0, new_priority, new_effort);
		new_task.addTask();
		currentProject.tasks.push(new_task);
		
		// Create the post-it
		// Get the click position
		// console.log(ev.pageX + " " + ev.pageY);
		
		create_postit(currentProject.tasks.length - 1);
		$("#" + new_task.id).css({ 
				'width' : (150*factor)+'px',
				'height': (150*factor)+'px' ,
				'font-size': factor*100+'%',
				'padding' : '0.5em',
				'position':'absolute',
				'left': ((new_effort-centerx)*factor + largura/2 - factor*width/2)+'px',
				'top': ((new_priority-centery)*factor + altura/2 - factor*width/2)+'px'});
		
		// Set up the mouse events on the new TASK
		bind_mouse_events(new_task.id);
	});
	
	// Scroll, zoom-in e zoom-out
	$('#whiteboard').bind('mousewheel', function(e) {
		if (!move && !supress) {
			if(e.wheelDelta > 0)
				zoom--;
			else 
				zoom++;
			
			factor = Math.pow(0.8, zoom);
			
			for(var i = 0; currentProject.tasks[i]!=null; i++) {
				newheight = factor*height;
				newwidth = factor*width;
				resize_postit(newheight,newwidth,i);
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
				startpos = $("#"+currentProject.tasks[i].id).position();
				$("#"+currentProject.tasks[i].id).css({"left": (startpos.left + ev.pageX - this.offsetLeft - px) + "px",
										"top": (startpos.top + ev.pageY - this.offsetTop - py) + "px"}); 
			}
			centerx -= (ev.pageX - this.offsetLeft - px)/factor;
			centery -= (ev.pageY - this.offsetTop - py)/factor;
		
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
			
			currentProject.tasks[j].effort += (endpos.left - ((currentProject.tasks[j].effort-centerx)*factor + largura/2 - factor*width/2))/factor;
			currentProject.tasks[j].priority += (endpos.top - ((currentProject.tasks[j].priority-centery)*factor + altura/2 - factor*height/2))/factor;
			// update priority & effort in DB
			currentProject.tasks[j].saveTask();
		});
		
		// Define double click event to edit the text in the task
		$('#content_'+task_id).editable('ajax/updateTaskName.php',{
				event: "dblclick",
				onblur: "cancel",
				style: "opacity: 0.5;",
				type: "textarea"
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
			$('#'+task_id).remove();
		});
		
			
		// To be done in this sprint
		$('#sprint_'+task_id).click(function(e){
			// Get the task index
			index = get_task_index(task_id);
			
			sprint = ((currentProject.currentSprint == currentProject.tasks[index].idsprint)? 0 : currentProject.currentSprint);
			
			// Make necessary changes on the DB
			console.log("Vou chamar o set task sprint para a task (" + task_id + "," + currentProject.tasks[index].name + ") com index = " + index + " e o sprint = " + sprint);
			set_task_sprint(task_id,sprint);
			
			// Make changes locally
			currentProject.tasks[index].idsprint = sprint;
			
			// Change the icon image
			$(this).attr("src","css/images/" + addtosprint_path(currentProject.tasks[index]));
		});
		
		// Set as done
		$('#check_'+task_id).click(function(e){
			// Get the task index
			index = get_task_index(task_id);
			
			// Make necessary changes on the DB
			set_task_done(task_id,currentProject.currentSprint);
			
			// Make changes locally
			currentProject.tasks[index].sprintdone = currentProject.currentSprint;
		});
	}
	
	// MISC FUNCTIONS
	
	// Returns a string representing the path to the "Add to sprint/Remove from sprint" image
	// Receives the task 
	function addtosprint_path(task){
		if(task.idsprint == 0)
			return "add_to_sprint.png";
		else return "remove_from_sprint.png"
	}
	
	// Returns the index of the correspondent task id
	function get_task_index(task_id) {
		for (var j = 0; currentProject.tasks[j] != null; j++)
			if (currentProject.tasks[j].id == task_id)
				return j;
		return null;
	}
	
	// Creates the post it
	function create_postit(i){
		var postitclass;
		if (currentProject.tasks[i].sprintdone > 0)
			postitclass = "postitdone";
		else
			postitclass = "postit";
			
		$("#whiteboard").append('<div id="' + currentProject.tasks[i].id + '" class="'+postitclass+'">' +
									'<img id="close_' + currentProject.tasks[i].id + '" title="Delete task" src="css/images/delete_icon.png" height="' + icon_height*factor + '" width="' + icon_width*factor + '" style="float:right; visibility:hidden;"/>' +
									'<img id="check_' + currentProject.tasks[i].id + '" title="Mark as done" src="css/images/check_icon.png" height="' + icon_height*factor + '" width="' + icon_width*factor + '" style="float:right; visibility:hidden;"/>' +
									'<img id="sprint_' + currentProject.tasks[i].id + '" title="Add to the current sprint" src="css/images/' + addtosprint_path(currentProject.tasks[i]) + '" height="' + icon_height*factor + '" width="' + icon_width*factor + '" style="float:right; visibility:hidden;"/>' +
									'<div id="content_'+currentProject.tasks[i].id+'" >' + currentProject.tasks[i].name + '</div>' +
								"</div>");
		$("#"+currentProject.tasks[i].id).draggable({ scroll: false , scrollSensitivity: 100, containment: 'parent' });
		define_postit_css(currentProject.tasks[i].priority,currentProject.tasks[i].effort);
	}
	
	function define_postit_css(priority,effort){
		$("#"+currentProject.tasks[i].id).css({ 'width' : (width*factor)+'px' , 'height': (height*factor)+'px' , 'padding' : '0.5em', 'position':'absolute', 'top':(altura/2 + priority-height/2)+'px', 'left':(largura/2 + effort-width/2)+'px'});
	}
	
	function resize_postit(newheight,newwidth,i){
		//Resize the post it
		$("#"+currentProject.tasks[i].id).css( { 
			'width': newwidth,
			'height': newheight,
			'font-size': factor*100+'%',
			'left': ((currentProject.tasks[i].effort-centerx)*factor + largura/2 - newwidth/2)+'px',
			'top': ((currentProject.tasks[i].priority-centery)*factor + altura/2 - newheight/2)+'px'
		});
		// Resize the icons
		$('#close_'+currentProject.tasks[i].id).css( {
			'width': icon_width*factor,
			'height': icon_height*factor
		});
		$('#check_'+currentProject.tasks[i].id).css( {
			'width': icon_width*factor,
			'height': icon_height*factor
		});
		$('#sprint_'+currentProject.tasks[i].id).css( {
			'width': icon_width*factor,
			'height': icon_height*factor
		});
	}
}
