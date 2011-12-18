<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	//get the username from REQUEST
	$username = $_REQUEST['user'];
	//get the project name
	$name = $_REQUEST['name'];
	

?>