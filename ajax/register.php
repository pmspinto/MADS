<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	
	require "db.php";
	
	$username = $_POST['email'];
	$password = $_POST['password'];
	$name = $_POST['name'];
	
	mysql_query("START TRANSACTION");
	
	$query = "INSERT INTO users VALUES ('$username','$password','$name')";
	$resultA = mysql_query($query);

	$query = "INSERT INTO projects (name,user,creationdate) values ('Tutorial','$username',SYSDATE())";
	$resultB = mysql_query($query);
	$id = mysql_insert_id();
	
	$query = "INSERT INTO project_users VALUES ('$id','$username')";
	$resultC = mysql_query($query);

	if(($resultA) and ($resultB) and ($resultC)){
		mysql_query("COMMIT");
		echo "ok";
	}
	else {
		mysql_query("ROLLBACK");		
		if(!$resultA)
			echo "Username already exists. Please choose another one";
		else //em principio nunca falhara sem ser na adicao de user, no entanto caso falhe o problema é grave e interno
			echo "Login failed. Please try again.";
	}
?>