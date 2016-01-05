<?php

	include_once '../database/database.php';

	// Create connection to db
	$conn =  mysql_connect($server, $username, $password) or die("Couldn't connect to MySQL" . mysql_error());
	mysql_select_db($database, $conn) or die ("Couldn't open $database: " . mysql_error());

	// -------------------------------------------------------------------------------------

	$year 	= $_POST['yr'];
	$day	= $_POST['dy'];
	$type 	= $_POST['tp'];
	$value 	= $_POST['val'];

	mysql_query("INSERT INTO analytics
	(
		xyear,
		xday,
		xtype,
		xvalue
	)
	VALUES
	(
		'" . $year . "',
		'" . $day . "',
		'" . $type . "',
		'" . $value . "'
	)");   

mysql_close($conn);
?>