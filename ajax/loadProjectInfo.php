<?php
	
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	session_start();

	require "db.php";
	
	// get the project id
	$projectID = $_POST['projectID'];
	
	// build the queries
	$projectInfoQ = "SELECT * 
					FROM projects
					WHERE id = " . $projectID;
				
	$projectUsersQ = "SELECT u.name, u.email
					FROM project_users pu, users u
					WHERE pu.email = u.email AND pu.id = " . $projectID;

	
	// execute the queries
	$projectInfo = mysql_query($projectInfoQ) or die("Error getting project info. - " . mysql_error());
	$projectUsers = mysql_query($projectUsersQ) or die("Error getting project users. - " . mysql_error());
	
	while($projectUsersFinal[] = mysql_fetch_assoc($projectUsers));
	array_pop($projectUsersFinal);

	
	$projectInfoFinal = mysql_fetch_assoc($projectInfo);
	$projectInfoFinal["users"] = $projectUsersFinal;
	
	// return the json encoded strings
	echo json_encode($projectInfoFinal);

?>
