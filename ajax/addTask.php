<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	$name = $_POST['name'];
	$user = $_POST['user'];
	$idproj = $_POST['idproj'];
	$idsprint = $_POST['idsprint'];
	$sprintdone = $_POST['sprintdone'];
	$priority = $_POST['priority'];
	$effort = $_POST['effort'];
	
	$query = "INSERT INTO tasks (id,name,user,idproj,idsprint,sprintdone,priority,effort) VALUES (NULL,'" . $name . "','" . $user . "',".$idproj . "," .$idsprint . ",".$sprintdone.",".$priority . ",".$effort . ")";
			
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	$id = mysql_insert_id();
	
	echo $id;
?>