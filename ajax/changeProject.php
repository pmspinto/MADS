<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);


	session_start();
	$_SESSION['currentProjectName'] = $_POST['projectName'];
	$_SESSION['currentProjectId'] = $_POST['projectId']


?>