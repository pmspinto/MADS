<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	$id = $_POST['id'];
	$value = $_POST['value'];
	
	$arr = explode('_',$id);
	
	$query = "UPDATE tasks SET name='".$value."' where id=".$arr[1];
	$result = mysql_query($query) or die('Error updating task: ' . mysql_error());

	echo $value;
?>