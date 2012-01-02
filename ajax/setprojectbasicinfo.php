<?php

	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";
	
	//se não existir a sessão...é esta a melhor maneira de matar?
	// P.S. 'user' até se definir o nome da sessão
	
	$idproj = $_POST['idproj'];
	$name = $_POST['name'];
	$description = $_POST['description'];
	
	$result = mysql_query("UPDATE projects SET name='".$name."', description='".$description."' WHERE id = ".$idproj);
	
	echo json_encode($resultArray);	
?>