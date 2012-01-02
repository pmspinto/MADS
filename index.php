<?php
	session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<META http-equiv="Content-Type" content="text/html; charset=utf-8">
		
		<title>Banana Tracker</title>
		
		<link type="text/css" href="css/smoothness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
		<link type="text/css" href="css/structstyle.css" rel="stylesheet" />
		<link type="text/css" href="css/login.css" rel="stylesheet" />
		<link type="text/css" href="css/project_menu.css" rel="stylesheet" />		
	
		<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-ui-1.8.16.custom.min.js"></script>
		<script type="text/javascript" src="js/jquery/jquery.jeditable.js"></script>
		<script type="text/javascript" src="js/graphs/highcharts.js"></script>
		<script type="text/javascript" src="js/graphs/graphs.js"></script>
		
		<script type="text/javascript" src="js/dialogs.js"></script>
		<script type="text/javascript" src="js/actions.js"></script>
		
	    <script type="text/javascript" src="js/Config.js"></script> 
		<script type="text/javascript" src="js/Project.js"></script>
		
		<script type="text/javascript" src="js/selections.js"></script>
		<script type="text/javascript" src="js/canvas.js"></script>
		<script type="text/javascript" src="js/task.js"></script>
		<script type="text/javascript">			
			var largura;
			var altura;
			var state;
			
			var vgemail;
			var vgname;
			var vgprojects;
			
			var currentProject = new Project();
			
			$(document).ready(function () {
				//global vars
				largura = $(window).width();
				altura = $(window).height();
				state = 1;

				//manage globals when resizing
				/*$(window).bind('resize', function() {
					largura = $(window).width();
					altura = $(window).height();
					
					init();
				});*/
				
				init();
			});
			
			function init() {
				$('#whiteboard').width(largura);
				$('#whiteboard').height(altura);	
				
				switchdialog(state);
			}
		</script>
	</head>
	<body>
		<div id="menubar" class="ui-widget-header" >
			<h1>Banana Tracker</h1>
			<div id="menu">
				<!-- Menu -->
			</div>
			<div id="menu_canvas">
			</div>
		</div>
		
		<div id="whiteboard">
			<!-- Main dialog  -->			
		</div>
		
		<!-- Error Dialog -->
		<div id="error_dialog" title="Error"></div>
		
	</body>
</html>

<script type="text/javascript">
	disableSelection(document.body); //disable text selection on entire body of page
	disableSelection(document.getElementById("whiteboard"));
	
	disableSelection(document.getElementById("menubar"));
	
	var postits = document.getElementsByClassName("postit");
	for (var i = 0; i < postits.length; i++)
		disableSelection(postits[i]);
</script>
