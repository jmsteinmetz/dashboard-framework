<?php

	include_once '../database/database.php';

	$year = $_GET['yr'];
	$type = $_GET['tp'];

	$callback = isset($_GET['callback']) ? preg_replace('/[^a-z0-9$_]/si', '', $_GET['callback']) : false;
	header('Content-Type: ' . ($callback ? 'application/javascript' : 'application/json') . ';charset=UTF-8');

	$conn =  mysql_connect($server, $username, $password) or die("Couldn't connect to MySQL" . mysql_error());
	mysql_select_db($database, $conn) or die ("Couldn't open $test: " . mysql_error());

	$rows = array();

	// Total Events by day
	// SELECT xvalue AS totalevents,  xmonth, xday, xyear, xtype FROM analytics.events WHERE xtype="Pageviews" OR xtype="ugcimpressions" ORDER BY xmonth, xday, xyear;

		$result = mysql_query("SELECT xvalue AS totalevents, xmonth, xday, xyear, xtype, xoffset FROM analytics.events WHERE xtype='Pageviews' OR xtype='ugcimpressions' ORDER BY xmonth, xday, xyear;");

		while($r = mysql_fetch_assoc($result)) {
			if ($r['xtype'] = 'Pageviews') {
				$rows['events']['Pageviews'][] = $r;
			}
			if ($r['xtype'] = 'ugcimpressions') {
				$rows['events']['Impressions'][] = $r;
			}
		    
		}
	

	echo ($callback ? $callback . '(' : '') . json_encode($rows) . ($callback ? ')' : '');

	mysql_close($conn);
?>