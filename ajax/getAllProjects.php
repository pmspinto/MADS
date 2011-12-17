<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	// get the username
	session_start();
	$userMail = $_REQUEST['user'];
	//$userMail = "mads@fe.up.pt";

	// search for the first project(FIXME: get the current one)
	$query = "SELECT p.id
			FROM projects p
			NATURAL JOIN project_users pu
			WHERE pu.user = " . "'" . $userMail . "'";

	$result = mysql_query($query) or die('Error getting current project: ' . mysql_error());

	// get all the results
	while($resultArray[]=mysql_fetch_assoc($result));
	array_pop($resultArray);

	// respond with the project name
	echo json_encode($resultArray);

?>

