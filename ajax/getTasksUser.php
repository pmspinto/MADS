<?php

	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	//se não existir a sessão...é esta a melhor maneira de matar?
	// P.S. 'user' até se definir o nome da sessão
	
	
	$username = $_POST['user'];
	
	
	$query = "SELECT id,name,user,sprintdate,completiondate,idproj
			FROM tasks
			WHERE user = " . "'" . $username . "'";
			
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	
	while($resultArray[]=mysql_fetch_assoc($result));
	array_pop($resultArray);
	
	
	
	echo json_encode($resultArray);
	
	
	
	
?>