<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	session_start();

	require "db.php";
	
	$username = $_POST['email'];
	$password = $_POST['password'];
	
	
	$query = "SELECT email, name FROM users WHERE email = '$username' AND pass = '$password'";
	$result = mysql_query($query) or die('Error logging in: ' . mysql_error());
	
	if (mysql_num_rows($result) > 0) {
		$row = mysql_fetch_assoc($result);
		
		$result2 = mysql_query("SELECT id as projid FROM project_users WHERE email = '$username'") or die('Error logging in: ' . mysql_error());
		while ($row2 = mysql_fetch_assoc($result2))
			$row['projs'][] = $row2['projid'];
		
		//$_SESSION['usermail'] = $row['mail'];
		$_SESSION['usermail'] = $_POST['email'];
		$_SESSION['username'] = $row['name'];
		$_SESSION['projs'] = json_encode($row['projs']);
		
		echo json_encode($row);
	}
	else
		echo '{"error":"Invalid login"}';
?>
