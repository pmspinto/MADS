<?php
/*	$link = mysql_connect('gnomo.fe.up.pt', 'ei07078', 'JEuo8i2sv')
		or die('Could not connect: ' . mysql_error());
	
	mysql_select_db('ei07078') or die('Could not select database');*/


	$link = mysql_connect('localhost', 'root', '')
		or die('Could not connect: ' . mysql_error());
	
	mysql_select_db('test') or die('Could not select database');
?>
