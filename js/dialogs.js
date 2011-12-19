
/** States
	0 - no dialog
	1 - welcomedialog
	2 - userdialog
	3 - projectdialog
	4 - graphdialog
	5 - backlogdialog
*/

function setdialog() {
	switch(state) {
		case 1:
			welcomedialog();
			break;
		case 2:
			userdialog();
			break;
		case 3:
			projectdialog();
			break;
		case 4:
			graphdialog();
			break;
		case 5:
			backlogdialog();
			break;
	}
}

function switchdialog(newState) {
	switch(state) {
		case 1:
			$('#welcomedialog').dialog("destroy");
			break;
		case 2:
			$('#userdialog').dialog("destroy");
			break;
		case 3:
			$('#projectdialog').dialog("destroy");
			break;
		case 4:
			$('#graphdialog').dialog("destroy");
			break;
		case 5:
			$('#backlogdialog').dialog("destroy");
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
									'			<button id="auth_button">Login</button>'+
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
	
	$("#welcomedialog").dialog({ width: largura-200, 
								 height: altura-200,
								 resizable: false,
								 closeOnEscape: false, 
								 open:  function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
								});
}

function userdialog() {
	$("#whiteboard").html( '<div id="userdialog" title="Welcome to User!">'+
								'<div id="loginleft">'+
									'Merda!'+
								'</div>'+
							'</div>');
	
	$('#menu').html('<button id="logout_button" onclick="logout_action();">Logout</button>');
	$('#logout_button').button();
	
	$("#userdialog").dialog({ width: largura-200, 
							  height: altura-200, 
							  resizable: false, 
							  closeOnEscape: false, 
							  open:  function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
							});
								
	
}

function projectdialog() {
	$("#whiteboard").html( '<div id="projectdialog" title="Welcome to Project!">'+
								'<div id="loginleft">'+
									'Merda!'+
								'</div>'+
							'</div>');
	
	$('#menu').html('<button id="logout_button" onclick="logout_action();">Logout</button>');
	$('#logout_button').button();
	
	$("#projectdialog").dialog({ width: largura-200, 
							  height: altura-200, 
							  resizable: false,
							  closeOnEscape: false, 
							  open:  function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }
							});
}

function graphdialog() {

}

function backlogdialog() {

}

