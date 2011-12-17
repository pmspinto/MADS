<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	// get the project id
	 $projectId = $_GET["id"];

	$query = "SELECT pu.user
		FROM projects p, project_users pu
		WHERE p.id = pu.id AND p.id = " . $projectId;

	$result = mysql_query($query) or die('Error getting current project: ' . mysql_error());

	// get all the results
	while($resultArray[]=mysql_fetch_assoc($result));
	array_pop($resultArray);

	// respond with the project name
	echo json_encode($resultArray);

?>
