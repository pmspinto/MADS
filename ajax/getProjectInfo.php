<?php

	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	//se n�o existir a sess�o...� esta a melhor maneira de matar?
	// P.S. 'user' at� se definir o nome da sess�o
	
	$idproj = $_POST['idproj'];
	
	$query = "SELECT name, description, currentsprint FROM projects WHERE id = ".$idproj;		
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	
	$resultArray = mysql_fetch_assoc($result);
	
	$query = "SELECT email, name FROM users natural join project_users WHERE id = ".$idproj;		
	$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	while($res[]=mysql_fetch_assoc($result));
	array_pop($res);

	$resultArray['users'] = $res;
	
	echo json_encode($resultArray);	
?>