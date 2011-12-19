function canvasInit(tasks) {
	var zoom = 0;
	var centerx = 0;
	var centery = 0;
	
	var width = 150;
	var	height = 150;
	
	var supress = false; // dragging single task
	var px = -1, py = -1; // previous
	var move = false; // in motion (canvas)
	var factor = 1;
		
	var task_click = false;
		
	for(var i = 0; tasks[i]!=null; i++) {
		$("#whiteboard").append("<div id="+tasks[i].id+" class='postit'> "+tasks[i].name+"</div>");
		$("#"+tasks[i].id).draggable({ scroll: true , scrollSensitivity: 100, containment: 'parent' });
		$("#"+tasks[i].id).css({ 'width' : width+'px' , 'height': height+'px' , 'padding' : '0.5em', 'position':'absolute', 'top':(altura/2 + tasks[i].priority-height/2)+'px', 'left':(largura/2 + tasks[i].effort-width/2)+'px'});
	}
	
		
	for (var i = 0; tasks[i]!=null; i++)
		bind_mouse_events(tasks[i].id);
	
	//$('.postit').editable(alert("ola"), { data   : " {'E':'Letter E','F':'Letter F','G':'Letter G', 'selected':'F'}",type: 'select' });
	
	
	/** EVENTOS ASSOCIADOS AO WHITEBOARD
	*	DOUBLECLICK, MOUSEWHEEL, MOUSEUP, MOUSEDOWN e MOUSEMOVE **/
	
	// Criar uma task nova
	$('#whiteboard').dblclick(function(ev) {
		if(!task_click){
			// É necessário pedir a' BD que crie uma nova task para atribuir um id
			// Da-se um id dummy ao construtor que depois é actualizado no addTask()
			// NECESSARIO DESCOBRIR:
			// User, id do projecto, id do sprint e effort e priority dependendo de onde foi clickado
			new_effort = (ev.pageX - ((centerx)*factor + largura/2))/factor;
			new_priority = (ev.pageY - ((centery)*factor + altura/2))/factor;
			
			new_task = new Task(0, "Set content", "mads@fe.up.pt", 2, 1, 0, new_priority, new_effort);
			new_task.addTask();
			tasks.push(new_task);
			
			// Create the post-it
			// Get the click position
			// console.log(ev.pageX + " " + ev.pageY);
			$("#whiteboard").append("<div id="+ new_task.id +" class='postit'>" + new_task.name + "</div>");
			$("#" + new_task.id).draggable({ scroll: true, scrollSensitivity: 100, containment: 'parent' });
			$("#" + new_task.id).css({ 
					'width' : (150*factor)+'px',
					'height': (150*factor)+'px' ,
					'font-size': factor*100+'%',
					'padding' : '0.5em',
					'position':'absolute',
					'top':(altura/2 + new_task.priority-height/2)+'px',
					'left':(largura/2 + new_task.effort-width/2)+'px'});
		
			// Set up the mouse events on the new TASK
			bind_mouse_events(new_task.id);
		}
		else task_click = false;
	});
	
	// Scroll, zoom-in e zoom-out
	$('#whiteboard').bind('mousewheel', function(e) {
		if (!move && !supress) {
			if(e.wheelDelta > 0)
				zoom--;
			else 
				zoom++;
			
			factor = Math.pow(0.8, zoom);
			
			for(var i = 0; tasks[i]!=null; i++) {
				newheight = factor*height;
				newwidth = factor*width;
				$("#"+tasks[i].id).css( { 
						'width': newwidth,
						'height': newheight,
						'font-size': factor*100+'%',
						'left': ((tasks[i].effort-centerx)*factor + largura/2 - newwidth/2)+'px',
						'top': ((tasks[i].priority-centery)*factor + altura/2 - newheight/2)+'px'
					} );
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
			for(var i = 0; tasks[i]!=null; i++) {
				startpos = $("#"+tasks[i].id).position();
				$("#"+tasks[i].id).css({"left": (startpos.left + ev.pageX - this.offsetLeft - px) + "px",
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
		
		for (var i = 0; tasks[i]!=null; i++) {
			$('#'+tasks[i].id).mousedown(function(e) {
				supress = true;
				px = -1;
			});
			
			$('#'+task_id).mouseup(function(e) {
				// update locally
				var j = get_task_index(this.id);
				
				endpos = $('#'+this.id).position();
				
				tasks[j].effort += (endpos.left - ((tasks[j].effort-centerx)*factor + largura/2 - factor*width/2))/factor;
				tasks[j].priority += (endpos.top - ((tasks[j].priority-centery)*factor + altura/2 - factor*height/2))/factor;
				// update priority & effort in DB
				tasks[j].saveTask();
			});
			
			// Define double click event to edit the text in the task
			$('#'+task_id).editable('ajax/updateTaskName.php',{
					event: "dblclick",
					style: "opacity: 0.5;"
			});
		}
	}
	
	
	// MISC FUNCTIONS
	function get_task_index(task_id){
		var j;
		for (j = 0; tasks[j] != null; j++)
			if (tasks[j].id == task_id)
				break;
		return j;
	}
}
