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
		
	//console.log(tasks.length);
		
	for(var i = 0; tasks[i]!=null; i++) {
		$("#whiteboard").append("<div id="+tasks[i].id+" class='postit'> "+tasks[i].name+"</div>");
		$("#"+tasks[i].id).draggable({ scroll: true , scrollSensitivity: 100 });
		$("#"+tasks[i].id).css({ 'width' : width+'px' , 'height': height+'px' , 'padding' : '0.5em', 'position':'absolute', 'top':(altura/2 + tasks[i].priority-height/2)+'px', 'left':(largura/2 + tasks[i].effort-width/2)+'px'});
	}
	
	//$('.postit').editable(alert("ola"), { data   : " {'E':'Letter E','F':'Letter F','G':'Letter G', 'selected':'F'}",type: 'select' });
	
	$('#whiteboard').mousedown(function(e) {
		if (supress) {
			supress = false;
			px = -1;
		}
		else {
			move = true;
			px = e.pageX - this.offsetLeft;
			py = e.pageY - this.offsetTop;
			//alert(py);
		}
	});
	
	$('#whiteboard').mousemove(function(ev) {
		if (move && !supress) {
			//alert('here');
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
	
	for (var i = 0; tasks[i]!=null; i++) {
		
		$('#'+tasks[i].id).mousedown(function(e) {
			supress = true;
			px = -1;
		});
		
		$('#'+tasks[i].id).mouseup(function(e) {
			// update locally
			var j;
			for (j = 0; tasks[j] != null; j++)
				if (tasks[j].id == this.id)
					break;
			
			endpos = $('#'+this.id).position();
			
			tasks[j].effort += (endpos.left - ((tasks[j].effort-centerx)*factor + largura/2 - factor*width/2))/factor;
			tasks[j].priority += (endpos.top - ((tasks[j].priority-centery)*factor + altura/2 - factor*height/2))/factor;
			// update priority & effort in DB
			// tasks[j].saveTask();
		});
	}
}
