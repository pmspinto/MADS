<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	$name = $_POST['name'];
	$user = $_POST['user'];
	$sprintdate = $_POST['sprintdate'];
	$completiondate = $_POST['completiondate'];
	$idproj = $_POST['idproj'];
	
	$query = "INSERT INTO tasks (id,name,user,sprintdate,completiondate,idproj) VALUES (NULL" . "'," . $name . "','" . $user . "','" . $sprintdate . "'," . $completiondate . ",".$idproj . ")";
			
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
?>