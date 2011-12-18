<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	// DB access
	require "db.php";

	//get the username from REQUEST
	$username = $_REQUEST['user'];
	//get the project name
	$name = $_REQUEST['name'];
	//get the project description
	$desc = $_REQUEST['desc'];
	
	//echo $username;
	//echo " ";
	//echo $name;
	//echo " ";
	//echo $desc;
	
	mysql_query("START TRANSACTION");
	$query = "INSERT INTO projects (name,user,creationdate,description) values ('$name','$username',SYSDATE(),'$desc')";
	//echo "\n".$query."\n";
	$resultA = mysql_query($query);
	$id = mysql_insert_id();
	
	$query = "INSERT INTO project_users VALUES ('$id','$username')";
	$resultB = mysql_query($query);
	
	if(($resultA) and ($resultB)){
		mysql_query("COMMIT");
		echo "ok";
	}
	else {
		mysql_query("ROLLBACK");
		echo "error";
	}
?>