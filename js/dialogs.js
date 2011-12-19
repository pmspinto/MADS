
/** States
	0 - no dialog
	1 - welcomedialog
	2 - projectdialog
*/

function setdialog() {
	switch(state) {
		case 1:
			welcomedialog();
			break;
		case 2:
			project();
			break;
	}
}

function switchdialog(newState) {
	switch(state) {
		case 1:
			$('#welcomedialog').dialog("destroy");
			break;
		case 2:
			$('#projectdialog').dialog("destroy");
			break;
	}
	state = newState;
	setdialog();
}

function welcomedialog() {
	$("#whiteboard").html( '<div id="welcomedialog" title="Welcome to Banana Tracker!">'+
								'<div id="loginleft">'+
									'<div id="post_it">'+
										'<div id = "post_it_text">' +
											'<p>Existe duas variaveis importantes num projeto: Esforco e Prioridade</p>' +
											'<p>O problema destas variaveis e a ausencia de uma representação visual pelo que normalmente vem associadas de um numero</p>' +
											'<p>Para resolver este problema oferecemos: Um quadro e post its.</p>' +
											'<p>No quadro podem ser adicionados post its e a sua organização representa o esforço e as prioridades de cada tarefa </p>' +
											'<p>Quanto mais para a direita no quadro um post it estiver mais esforço está associado, quanto mais para cima maior a prioridade</p>' +
										'</div>' +
									'</div>' +
								'</div>'+
								'<div id="loginright">'+
									'<form action="javascript: login_action();" class="loginform">'+
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
									'			<button id="auth_button">Login</button> <img id="progress_icon" src="css/images/loading.gif" /></div>'+
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
									'<p> </p><p> </p>'+
									'<div id="projectmenuselected"><p>Mads2011</p></div>'+
									'<p>Dissertation</p>'+
									'<p>Christmas Gifts</p>'+
								'</div>'+
								'<div id="projectcontent">'+
									'<button id="proj_info">Project Info</button>'+
									'<button id="proj_burndown">Burndown Chart</button>'+
									'<button id="proj_velocity">Velocity Chart</button>'+
									'<div id="projectinnercontent">'+
										'<div id="projectinfo">'+
											'<h2>Project info</h2>'+
											'<p>Name: </p>'+
											'<input type="text" name="projectname" value="Mads2011"/>'+
											'<p>Description: </p>'+
											'<textarea rows="5" cols="30">'+
												'Our project in the course of Agile Software development'+
											'</textarea><br/>'+
											'<button id="saveproject">Save</button>'+
										'</div>'+
										'<div id="membersinfo">'+
											'<h2>Members info</h2>'+
											'<p><img src="css/images/remove_user.png" />Jack Daniels</p>'+
											'<p><img src="css/images/remove_user.png" />Johnny Walker</p>'+
											'<p><img src="css/images/remove_user.png" />William Grant</p>'+
											'<button id="newmember">Add member</button>'+
										'</div>'+
										'<div id="projectchanges">'+
											'<h2>Last Changes</h2>'+
											'<p><img src="css/images/post_icon.png" /><span>19 Dec, 2011</span> - New Sprint</p>'+
											'<p><img src="css/images/post_icon.png" /><span>17 Dec, 2011</span> - Move tasks in whiteboard - done!</p>'+
											'<p><img src="css/images/post_icon.png" /><span>16 Dec, 2011</span> - Burndown chart - Added</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>');
							
	$('#saveproject').button();
	$('#newmember').button();
	$('#proj_info').button();
	$('#proj_burndown').button();
	$('#proj_velocity').button();
	
	$('#proj_info').click(function(e) {
		$('#projectinnercontent').hide();
		$('#projectinnercontent').html('<div id="projectinfo">'+
											'<h2>Project info</h2>'+
											'<p>Name: </p>'+
											'<input type="text" name="projectname" value="Mads2011"/>'+
											'<p>Description: </p>'+
											'<textarea rows="5" cols="30">'+
												'Our project in the course of Agile Software development'+
											'</textarea><br/>'+
											'<button id="saveproject">Save</button>'+
										'</div>'+
										'<div id="membersinfo">'+
											'<h2>Members info</h2>'+
											'<p><img src="css/images/remove_user.png" />Jack Daniels</p>'+
											'<p><img src="css/images/remove_user.png" />Johnny Walker</p>'+
											'<p><img src="css/images/remove_user.png" />William Grant</p>'+
											'<button id="newmember">Add member</button>'+
										'</div>'+
										'<div id="projectchanges">'+
											'<h2>Last Changes</h2>'+
											'<p><img src="css/images/post_icon.png" /><span>19 Dec, 2011</span> - New Sprint</p>'+
											'<p><img src="css/images/post_icon.png" /><span>17 Dec, 2011</span> - Move tasks in whiteboard - done!</p>'+
											'<p><img src="css/images/post_icon.png" /><span>16 Dec, 2011</span> - Burndown chart - Added</p>'+
										'</div>');
		$('#saveproject').button();
		$('#newmember').button();
		$('#projectinnercontent').show('slow');	
		
	});
	
	$('#proj_burndown').click(function(e) {
		$('#projectinnercontent').html('<div id="burndown_container" style="width: 800px; height: 400px; margin: 0 auto">cenas</div>');
		Graph('Mads2011', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [ 28, 25, 23, 21, 18, 14, 10, 7, 6, 5, 3, 0], 'Sprint', 'Effort points left', 'Burndown', 'burndown_container');
	});
	
	$('#proj_velocity').click(function(e) {
		$('#projectinnercontent').html('<div id="velocity_container" style="width: 800px; height: 400px; margin: 0 auto"></div>');
		Graph('Mads2011', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [ 10, 11, 11, 8, 9, 12, 9, 7, 11, 10, 11, 10], 'Sprint', 'Effort points', 'Velocity', 'velocity_container');
	});
	
	$('#menu').html('<button id="logout_button" onclick="logout_action();">Logout</button>');
	$('#logout_button').button();
	
	$("#projectdialog").dialog({ width: largura-200, 
							  height: altura-200, 
							  resizable: false, 
							  closeOnEscape: false,
							  close: function(event, ui) { canvasInit();}
							});
}

