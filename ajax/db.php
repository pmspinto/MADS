<?php
	$link = mysql_connect('gnomo.fe.up.pt', 'ei07089', 'miguelchefao007')
		or die('Could not connect: ' . mysql_error());
	
	mysql_select_db('ei07089') or die('Could not select database');
?>