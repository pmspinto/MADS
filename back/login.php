<?php
	header("Content-Type: text/html; charset=utf8");
	require_once "db.php";
	
	echo 'plim';
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	session_start();

	$mail = $_REQUEST['email'];
	$password = $_REQUEST['password'];
	
	Database::start();
	$login_info = Database::login($mail, $password);
	
	$_SESSION['email'] = $login_info['email'];
	$_SESSION['username'] = $login_info['name'];
	$_SESSION['projects'] = $login_info['projects'];
	
	echo json_encode($login_info);
?>
