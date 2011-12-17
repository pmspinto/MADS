<?php
	session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Banana Tracker</title>
		<link type="text/css" href="css/structstyle.css" rel="stylesheet" />
		<link type="text/css" href="css/login.css" rel="stylesheet" />
		<link type="text/css" href="css/project_menu.css" rel="stylesheet" />
		<link type="text/css" href="css/smoothness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
		
		<META http-equiv="Content-Type" content="text/html; charset=utf-8">
			
		<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js"></script>
		<script type="text/javascript" src="js/menu.js"></script>
		<script type="text/javascript" src="js/projects.js"></script>
		<script type="text/javascript" src="js/login_register.js"></script> 
		<script type="text/javascript" src="js/user.js"></script>
		<script type="text/javascript">
			var username;
			var usermail;
			var userprojs;
			var currentProject;
			var Utilizador;
			
			$(document).ready(function () {

				//global vars
				var largura = $(window).width();
				var altura = $(window).height();
				
				//menu bar
				$('#menubar').width(largura);
				$("#login_button").button();
				$("#project_button").button();
				$("#logout_button").button();
				$("#stats_button").button();
				
				//whiteboard - backlog
				var canvasW = largura;
				var canvasH = altura-34;
				$('#whiteboard').width(largura);
				$('#whiteboard').height(canvasH);
				$('#whiteboard').html('<canvas id="backlog" height="'+canvasH+'" width="'+canvasW+'">You should upgrade your browser...</canvas>');
						
				<?php if (!isset($_SESSION['usermail'])) { ?>
				
				//welcome dialog
				$("#welcomedialog").dialog({ width: largura-200, height: altura-200, modal: true, resizable: false, closeOnEscape: false, open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }});
								
				<?php 
				} 
				else { 
					echo "username = '" . $_SESSION['username'] . "'\n";
					echo "usermail = '" . $_SESSION['usermail'] . "'\n";
					echo "userproj = " . $_SESSION['projs'] . "\n";
					
					//por causa do refresh mandar tudo ao ar, e' necessário instanciar outra vez o user
					echo "Utilizador = new User(usermail,username);\n";
					echo "Utilizador.Projects = userproj;\n";
					echo "Utilizador.CurrentProject = userproj[0];\n";
					echo "fillProjectSelector();\n";
				}
				?>
				//debug painting
				
			});
		</script>
	</head>
	<body>
		<div id="menubar" class="ui-widget-header" >
			<h1>Banana Tracker</h1>
			
			<select id="projectSelector" onchange="projectChange();">
					<option value="" disabled="disabled">Jump to a project...</option>
					<option value="" disabled="disabled">---</option>
			</select>

			<button id="project_button" onclick="launchProjectMenu();">Project</button>
			<button id="stats_button">Stats</button>
			
			<div id="menu">
	
				<div id="logbutton" style="display: inline;">
				<?php 
					if (!isset($_SESSION['usermail'])) { 
				?>
						<button id="login_button" onclick="$('#welcomedialog').dialog(
							{ width: largura-200, height: altura-200, modal: true, resizable: false, closeOnEscape: false,
							  open: function(event, ui) { $('.ui-dialog-titlebar-close').hide(); }});">
							Login
						</button>				
				<?php 
					} else { 
				?>

						<button id="logout_button" onclick="logoutAction();">Logout</button>

				<?php 
					} 
				?>
				</div>
			</div>
		</div>
		<div id="whiteboard">
		</div>

		<div style="display:none" id="progress-dialog" title="Progress Dialog" >
			<img src="images/loading.gif" />		
		</div>
		
		<div style="display:none" id="loading-dialog" title="Loading">
		<div style="display:none" id="error-dialog" title="Error">
		</div>
		
		<?php 
				include "menu.php";
				include "projectForms.php";
				if (!isset($_SESSION['usermail']))
					include "welcomedialog.php";
		?>

	</body>
</html>
