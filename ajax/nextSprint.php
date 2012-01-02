<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	$idproj = $_POST['projid'];
	// $result = mysql_query($query) or die('Error incrementing sprint: ' . mysql_error());

	// echo $result;
?>