<?php

header("Content-Type: text/html; charset=utf8");
	
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_errors',1);

// DB access
require "db.php";

$json = $_POST['json'];

$arr = json_decode($json);
array_pop($arr);
$query = "select * from tasks where ";

for($i=0;$i<count($arr);$i++)
{
	if($i == count($arr) -1) $query = $query . "id=".$arr[$i];
	else $query = $query . "id=".$arr[$i]. " or ";
	
}

$result = mysql_query($query) or die('Error getting tasks: ' . mysql_error());
	
while($resultArray[]=mysql_fetch_assoc($result));
array_pop($resultArray);
		
echo json_encode($resultArray);
?>