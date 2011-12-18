<?php
class Database {
	static $con

	static function start() {
		$con = mysql_connect("gnomo.fe.up.pt","ei07089","miguelchefao007");
		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}
		$sel = mysql_select_db("ei07089", $con);
		if (!$sel) {
			die('Could not select db: ' . mysql_error());
		}
		return $con;
	}
	
	static function startTest() {
		//testers que mudem isto...
		$con = mysql_connect("gnomo.fe.up.pt","ei07089","miguelchefao007");
		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}
		$sel = mysql_select_db("ei07089", $con);
		if (!$sel) {
			die('Could not select db: ' . mysql_error());
		}
		return $con;
	}
	
	static function login($email, $pass) {
		$result = mysql_query('SELECT email, name FROM users WHERE mail = "'.$email.'" AND pass = "'.$pass.'"');
		if (!$result) {
			die('Invalid query: ' . mysql_error());
		}
		$login = mysql_fetch_assoc($result);
		
		$result2 = mysql_query("SELECT id FROM project_users WHERE email = '$email'");
		if(!$result2) {
			die('Invalid query: ' . mysql_error());
		}
		
		$a = array();
		while ($row2 = mysql_fetch_assoc($result2))
			$a[] = $row2['id'];
		$login['projects'][] = $a;
		
		return $login;
	}
	
	
	
	
	static function checkUser($username, $pass) {
		$con = Database::start();
		
		$result = mysql_query('SELECT * FROM authentication WHERE username = "'.$username.'" AND password = "'.$pass.'"');
		if (!$result) {
			die('Invalid query: ' . mysql_error());
		}
		return mysql_fetch_assoc($result);
	}
	
?>