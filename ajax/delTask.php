<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	$id = $_POST['id'];
	
	$query = "DELETE FROM tasks WHERE id=".$id;
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	
	echo $result;
?>