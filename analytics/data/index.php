<?php

	include_once 'database.php';

	$year 	= $_GET['yr'];
	$type 	= $_GET['tp'];
	$start 	= $_GET['start'];
	$end 	= $_GET['end'];

	$callback = isset($_GET['callback']) ? preg_replace('/[^a-z0-9$_]/si', '', $_GET['callback']) : false;
	header('Content-Type: ' . ($callback ? 'application/javascript' : 'application/json') . ';charset=UTF-8');

	$conn =  mysql_connect($server, $username, $password) or die("Couldn't connect to MySQL" . mysql_error());
	mysql_select_db($database, $conn) or die ("Couldn't open: " . mysql_error());

	$rows = array();

	if ($type === 'all') {

		$result = mysql_query("SELECT CAST(xoffset AS SIGNED) AS xoffset, CAST(sum(xvalue) AS SIGNED) as totalvalue
			FROM events 
			WHERE xyear = '" . $year . "' GROUP BY xoffset ORDER BY xoffset ASC  ");

		while($r = mysql_fetch_assoc($result)) {
	    	$rows['events']['totals'][] = $r;
		}

		$result = mysql_query("SELECT xoffset, xvalue
			FROM events 
			WHERE xyear = '" . $year . "' AND xtype='ugcimpressions'");

		while($r = mysql_fetch_assoc($result)) {
	    	$rows['events']['imp'][] = $r;
		}

		$result = mysql_query("SELECT xoffset, xvalue
			FROM events 
			WHERE xyear = '" . $year . "' AND xtype='Pageviews'");

		while($r = mysql_fetch_assoc($result)) {
	    	$rows['events']['page'][] = $r;
		}

	} 

	if ($type === 'Pageviews' || $type === 'ugcimpressions' || $type === 'total') {

		if (isset($start, $end)) {
			$result = mysql_query("SELECT *,
			CONCAT(`xyear`,'-',LPAD(`xmonth`,2,'00'),'-',LPAD(`xday`,2,'00')) AS xfulldate
			FROM events 
			WHERE BETWEEN '" . $start . "' AND '" . $end . "' AND xtype = '" . $type . "'");
		} else {
			$result = mysql_query("SELECT *
			FROM events 
			WHERE xyear = '" . $year . "' AND xtype = '" . $type . "'");
		}
		

		while($r = mysql_fetch_assoc($result)) {
		    $rows['events'][] = $r;
		}

	}


	echo ($callback ? $callback . '(' : '') . json_encode($rows) . ($callback ? ')' : '');

	mysql_close($conn);
?>