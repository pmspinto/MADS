<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	// get the project ids(array)
	$projectIds = $_GET["ids"];

	$glued = implode(",", $projectIds);

	$query = "SELECT p.id, p.name, p.user as owner, p.creationdate
		FROM projects p
		WHERE p.id in (" . $glued . ")";

	$result = mysql_query($query) or die('Error getting current project: ' . mysql_error());

	// get all the results
	while($resultArray[]=mysql_fetch_assoc($result));
	array_pop($resultArray);

	// respond with the project name
	echo json_encode($resultArray);

?>
