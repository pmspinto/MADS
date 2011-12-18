<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	session_start();
	
	if(isset($_SESSION['currentProjectName'])){
		$result['name'] = $_SESSION['currentProjectName'];
		$result['id'] = $_SESSION['currentProjectId'];
		
		echo json_encode($result);
	}
	else{
		$userMail = $_SESSION['usermail'];
		//$userMail = "mads@fe.up.pt";

		// search for the first project(FIXME: get the current one)
		$query = "SELECT p.name, p.id
				FROM projects p
				NATURAL JOIN project_users pu
				WHERE pu.user = " . "'" . $userMail . "'";

		$result = mysql_query($query) or die('Error getting current project: ' . mysql_error());

		$json = mysql_fetch_assoc($result);

		// save it on the session
		$_SESSION['currentProjectName'] = $json['name'];	
		$_SESSION['currentProjectId'] = $json['id'];

		// respond with the project name
		echo json_encode($json);
	}
	


?>

