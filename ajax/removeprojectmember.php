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
	$email = $_POST['email'];
	
	$result = mysql_query("DELETE FROM project_users WHERE id=".$idproj." AND email='".$email."'");
	echo json_encode($email);
?>