<?php
	session_start();
	
	$menu = '';
	if (isset($_SESSION['usermail'])) { 
		$menu = '<button id="logout_button" onclick="logout_action();">Logout</button>';
	}
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
		<script type="text/javascript" src="js/graphs/highcharts.js"></script>
		<script type="text/javascript" src="js/graphs/graphs.js"></script>
		
		<script type="text/javascript" src="js/dialogs.js"></script>
		<script type="text/javascript" src="js/actions.js"></script>
		
		<script type="text/javascript" src="js/selections.js"></script>
		<script type="text/javascript" src="js/canvas.js"></script>
		<script type="text/javascript" src="js/task.js"></script>
		<script type="text/javascript">			
			var largura;
			var altura;
			var state;
			
			var email;
			var name;
			var projects;
			
			$.ajaxSetup({async:false});
			var tasks = TaskList.getTasksProject(2);
			$.ajaxSetup({async:true});
			
			$(document).ready(function () {
				//global vars
				largura = $(window).width();
				altura = $(window).height();
				state = 1;

				//manage globals when resizing
				$(window).bind('resize', function() {
                    largura = $(window).width();
                    altura = $(window).height();
					
					init();
				});
				
				init();
				
				canvasInit(tasks);
			});
			
			function init() {
				$('#whiteboard').width(largura);
				$('#whiteboard').height(altura-34);
				
				setdialog();
			}
		</script>
	</head>
	<body>
		<div id="menubar" class="ui-widget-header" >
			<h1>Banana Tracker</h1>
			<div id="menu">
				<?php echo $menu; ?> 
			</div>
		</div>
		<div id="whiteboard">
			<!-- Main dialog  -->			
		</div>

		<!-- Progress dialog -->
		<div id="progress_dialog" title="Progress Dialog" >
			<img src="images/loading.gif" />		
		</div>
		
		<!-- Error Dialog -->
		<div id="error_dialog" title="Error"></div>
		
	</body>
</html>
<script type="text/javascript">
disableSelection(document.body); //disable text selection on entire body of page
var whiteboarddiv=document.getElementById("whiteboard")
disableSelection(whiteboarddiv)
</script>
