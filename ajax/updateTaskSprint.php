<?php

	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	//se n�o existir a sess�o...� esta a melhor maneira de matar?
	// P.S. 'user' at� se definir o nome da sess�o
	
	$id = $_POST['id'];
	$idsprint = $_POST['idsprint'];
	
	$result = mysql_query("UPDATE tasks SET idsprint=".$idsprint." WHERE id = ".$id);
	
	echo json_encode($resultArray);	
?>