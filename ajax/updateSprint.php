<?php

	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	//se não existir a sessão...é esta a melhor maneira de matar?
	// P.S. 'user' até se definir o nome da sessão
	
	$id = $_POST['id'];
	
	$result = mysql_query("UPDATE projects SET currentsprint=currentsprint+1 WHERE id = ".$id);
	
	echo json_encode($resultArray);	
?>