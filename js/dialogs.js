
/** States
	0 - no dialog
	1 - welcomedialog
	2 - projectdialog
*/

function setdialog() {
	if(state == 1)
		welcomedialog();
	else
		project();
}

function switchdialog(newState) {
	if(state == 1) 
		$('#welcomedialog').remove();
	state = newState;
	setdialog();
}

function welcomedialog() {
	$("#whiteboard").html( '<div id="welcomedialog" title="Welcome to Banana Tracker!">'+
								'<div id="loginleft">'+
									'<div id="intro">'+
										'<img src="css/images/logo.png" alt="Banana Tracker Logo"/>' +
										'<p> In Banana Tracker we provide tools to organize your tasks. You can sort your tasks in a bidimensional board. </p>' +
										'<img src="css/images/graph.png" class="graph" alt="Effort and Priority Graph"/>' +
										'</div>' +
								'</div>'+
								'<div id="loginright">'+
									'<form id="loginform" action="javascript: login_action();" class="loginform">'+
									'<fieldset>'+
									'	<legend>Login</legend>'+
									'	<ol>'+
									'		<li>'+
									'			<label for="email">Email:</label>  '+
									'			<input type="text" name="email" id="loginemail" />'+
									'		</li>'+
									'		<li>'+
									'			<label for="password">Password:</label> '+
									'			<input type="password" name="password" id="loginpassword"/>'+
									'		</li>'+
									'		<li>'+
									'			<button form="loginform" type="submit" id="auth_button">Login</button> <img id="progress_icon" src="css/images/loading.gif" /></div>'+
									'		</li>'+
									'	</ol>'+
									'</fieldset>'+
									'</form>'+
									'<form action="javascript: register_action();" class="loginform">'+
									'<fieldset>'+
									'	<legend>Register</legend>'+
									'	<ol>'+
									'		<li>'+
									'			<label for="email">Email:</label>  '+
									'			<input type="text" name="email"  id="registeremail"/>'+
									'		</li>'+
									'		<li>'+
									'			<label for="name">Name:</label>  '+
									'			<input type="text" name="name"  id="registername"/>'+
									'		</li>'+
									'		<li>'+
									'			<label for="password">Password:</label> '+
									'			<input type="password" name="password"  id="registerpassword"/>'+
									'		</li>'+
									'		<li>'+
									'			<label for="cpassword">Confirm password:</label> '+
									'			<input type="password" name="cpassword"  id="registercpassword"/>'+
									'		</li>'+
									'		<li>'+
									'			<button id="register_button">Register</button>'+
									'		</li>'+
									'	</ol>'+
									'</fieldset>'+
									'</form>'+
								'</div>'+
							'</div>	');
						
	$('#menu').html('');	
	$('#menu_canvas').html('');	
	$('#auth_button').button();
	$('#register_button').button();
	
	$('#progress_icon').hide();
	
	$("#welcomedialog").dialog({ width: largura-200, 
								 height: altura-200,
								 resizable: false,
								 closeOnEscape: false, 
								 open:  function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
								});
}
function project() {
	$("#whiteboard").html( '<div id="projectdialog" title="Projects">'+
								'<div id="projectmenu">'+
									'<div id="projectbuttondiv">'+
										'<button id="newproject">New Project</button>'+
									'</div>'+
									'<div id="projectlist">'+
									'</div>'+
								'</div>'+
								'<div id="projectcontent">'+
									'<button id="proj_info">Project Info</button>'+
									'<button id="proj_burndown">Burndown Chart</button>'+
									'<button id="proj_velocity">Velocity Chart</button>'+
									'<div id="projectinnercontent">'+
									'</div>'+
								'</div>'+
								'<div id="userlist" title="Users">'+
								'</div>'+
							'</div>');
	$('#proj_info').button();
	$('#proj_burndown').button();
	$('#proj_velocity').button();
	$('#newproject').button();
	
	updatedialog();
	
	$('#proj_info').click(function(e) {
		state = 2;
		updatedialog();
	});
	
	$('#proj_burndown').click(function(e) {
		state = 3;
		updatedialog();
	});
	
	$('#proj_velocity').click(function(e) {
		state = 4;
		updatedialog();
	});
	
	
	//top menu
	$('#menu').html('<button id="logout_button" onclick="logout_action();">Logout</button>');
	$('#logout_button').button();
	
	$("#projectdialog").dialog({ width: largura-200, 
							  height: altura-200, 
							  resizable: false, 
							  closeOnEscape: false,
							  close: function(event, ui) {  canvasmenu(); canvasInit(); $("#projectdialog").remove();}
							});
}

function updatedialog() {
	if(state == 2) {
		projectboard();
	} else if(state == 3) {
		burndown();
	} else  {
		velocity();
	}
	projectmenu();
}

function velocity() {
	$('#projectinnercontent').html('<div id="velocity_container" style="width: 800px; height: 390px; margin: 0 auto"></div>');
	var velocity = currentProject.getVelocity();
	VelGraph(currentProject.name, velocity['sprint'], velocity['velocity'],'Sprint', 'Effort points', 'Velocity', 'velocity_container');
}

function burndown() {
	$('#projectinnercontent').html('<div id="burndown_container" style="width: 800px; height: 390px; margin: 0 auto">cenas</div>');
	var sprints = currentProject.getSprints();
	Graph(currentProject.name, sprints['sprint'], sprints['effort'], sprints['annotations'], 'Sprint', 'Effort points left', 'Burndown', 'burndown_container');
}

function projectboard() {
	$('#projectinnercontent').hide();
	$('#projectinnercontent').html('<div id="projectinfo">'+
									'</div>'+
									'<div id="membersinfo">'+
									'</div>'+
									'<div id="projectchanges">'+
										'<h2>Last Changes</h2>'+
										'<p><img src="css/images/post_icon.png" /><span>19 Dec, 2011</span> - New Sprint</p>'+
										'<p><img src="css/images/post_icon.png" /><span>17 Dec, 2011</span> - Move tasks in whiteboard - done!</p>'+
										'<p><img src="css/images/post_icon.png" /><span>16 Dec, 2011</span> - Burndown chart - Added</p>'+
									'</div>');
	$('#projectinnercontent').show('slow');	
	projectinfo();
	projectusers();
}

function projectusers() {
	var userslist = '<h2>Members info</h2>';
	
	for(var i = 0; i<currentProject.users.length; i++) {
		userslist += '<p><a class="projectusers" id="'+currentProject.users[i].email+'"><img src="css/images/remove_user.png" /></a>'+currentProject.users[i].name+'</p>'
	}
		
	userslist += '<button id="newmember">Add member</button>';
	$('#membersinfo').html(userslist);
	
	$('#newmember').button();
	$('#newmember').click(function() {
		$('#userlist').html('<p><img src="css/images/add_member.png" />John Terry</p><p><img src="css/images/add_member.png" />Francis Curtis</p><p><img src="css/images/add_member.png" />Luv Tender</li></p>');
		$('#userlist').dialog({ width: 250, 
							  height: 300, 
							  resizable: false, 
							  closeOnEscape: false,
							});
	});
	
	$('.projectusers').click(function() {
		var email = $(this).attr('id');
		for(var i = 0; i<currentProject.users.length; i++)
			if(currentProject.users[i].email == email)
				currentProject.users.splice(i, 1);
		currentProject.removeUser(email);
	});
}

function projectinfo() {
	$('#projectinfo').html(
		'<h2>Project info</h2>'+
		'<p>Name: </p>'+
		'<input type="text" id="projectname" value="'+currentProject.name+'"/>'+
		'<p>Description: </p>'+
		'<textarea id="projectdescription" rows="5" cols="30">'+
			currentProject.description+
		'</textarea><br/>'+
		'<p>Max effort: <input id="projectmaxeffort" type="number" min="0" max="30" step="1" value ="'+currentProject.maxeffort+'"/> </p>'+
		'<button id="saveproject">Save</button>');
		
	$('#saveproject').button();
	$('#saveproject').click(function() {
		currentProject.name = $('#projectname').attr('value');
		currentProject.description = $('#projectdescription').val();
		currentProject.maxeffort = $('#projectmaxeffort').attr('value');
		for(var i = 0; i<vgprojects.length; i++)
			if(vgprojects[i]['id'] == currentProject.id)
				vgprojects[i]['name'] = currentProject.name;
		currentProject.saveBasicProjectInfo();
	});
}

function projectmenu() {
	newmenu = '';
	for(var i = 0; i<vgprojects.length; i++) {
		//console.log(vgprojects[i]);
		if(vgprojects[i]['id'] == currentProject.id)
			newmenu += '<div id="projectmenuselected"><p>'+vgprojects[i]['name']+'</p></div>';
		else
			newmenu += '<div class="projectmenuitem" id="'+vgprojects[i]['id']+'"> <p>'+vgprojects[i]['name']+'</p></div>'
	}
	$('#projectlist').html(newmenu);
	$('.projectmenuitem').click(function() {
		currentProject = new Project($(this).attr("id"));
		currentProject.loadProjTasks();
		currentProject.loadProjInfo();
	});
}

function canvasmenu() {
	$('#menu_canvas').html(
		'<form name="menuform">'+
		'<button id="backtoproject">Project Info</button>' +
		'<button id="sprint_number" onclick="next_sprint();">'+currentProject.currentSprint+'</button>' +
		'</button>' +
		'<button id="next_sprint">' +
			'<img class="next_sprint_icon" src="css/images/next_sprint.png" align="absmiddle">' +
		'</button>' +
		'<label for="filter_done"><img class="postit_icon" src="css/images/done_postit_icon.png" align="absmiddle">Done</label>' +
		'<input type="checkbox" id="filter_done" onclick="javascript: filterByDone();"/>'+
		'</form>');
	
	$('#filter_done').button();
	$('#next_sprint').button();
	$('#sprint_number').button();
	$('#sprint_number').attr("disabled", true);
	$('#backtoproject').button();
	$('#backtoproject').click(function(evt) {
		$("#whiteboard").html("");
		project();
		$('#menu_canvas').html("");
		evt.preventDefault();	
	});
	
	$('#next_sprint').click(function(ev) {
		ev.preventDefault();
		actionNextSprint();
		canvasmenu();
	});
}
