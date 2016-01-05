	$(function() {

	    var predictionYr = 2015;
	    var pageviews_increaseYr1 = 0.4697;
	    var pageviews_increaseYr2 = 0.42619;
	    var impressions_increaseYr1 = 0.41719;
	    var impressions_increaseYr2 = 0.29885;
	    // Assuming 8% increase until functions are built from API
	    var pageviews_dailyincreaseYr1Current = 0.08;
	    var impressions_dailyincreaseYr1Current = 0.08;
	    var pageviews_increase = pageviews_increaseYr1 + ((pageviews_increaseYr1 + pageviews_increaseYr2)/2 + pageviews_dailyincreaseYr1Current);
	    var impressions_increase = impressions_increaseYr1 + ((impressions_increaseYr1 + impressions_increaseYr2)/2 + impressions_dailyincreaseYr1Current);
	    var total_increase = .59;


	    var stack = 0,
	        bars = true,
	        lines = false,
	        steps = false;

	    // Sample data
	    var d1 = [];
	    for (var i = -10; i <= 7; i += 1) {
	        d1.push([i, parseInt(Math.random() * 30)]);
	    }

	    var d2 = [];
	    for (var i = -10; i <= 7; i += 1) {
	        d2.push([i, parseInt(Math.random() * 30)]);
	    }

	    var d3 = [];
	    for (var i = -10; i <= 7; i += 1) {
	        d3.push([i, parseInt(Math.random() * 30)]);
	    }

	    function getMagpie(localvariable, endpoint) {

	        $.ajax({
	            dataType: "jsonp",
	            contentType: 'application/json',
	            data: JSON.stringify(),
	            url: endpoint,
	            cache: false,
	            //jsonpCallback: "parseResponse",
	            success: function(data) {
	                console.log(data);

	            },
	            error: function(data) {
	                console.log(data + " error");
	                localStorage.setItem(localvariable, endpoint);
	            }
	        });
	    };

	    function plotTotal(localvariable, endpoint1, endpoint2, target, colors, test, highbound, lowbound, compare) {

	        var markings = [{
	            yaxis: {
	                from: lowbound,
	                to: highbound
	            },
	            color: "#E8E8E8"
	        }];

	        var autoMarkings = {
	            enabled: true,
	            showMinMax: false,
	            min: 100000000,
	            showAvg: true,
	            lineWidth: .75,
	            avgcolor: "#666"
	        };

	        var lines = {
	            show: true,
	            fill: true,
	            fillColor: {
	                colors: [{
	                    opacity: 0.7
	                }, {
	                    opacity: 0.1
	                }]
	            }
	        };

	        var points = {
	            show: true
	        };

	        var tooltip = {
	            show: true,
	            cssClass: "newflotTip",
	            //content: "%s | x: %x; y: %y"
	            content: "%y"
	        };

	        if (test == true) {

	            $.plot("#" + target, [d1], {
	                series: {
	                    autoMarkings: autoMarkings,
	                    stack: false,
	                    lines: lines,
	                    points: points
	                },
	                grid: {
	                    hoverable: true,
	                    markings: markings
	                },
	                tooltip: tooltip,
	                yaxis: {
	                    tickFormatter: function numberWithCommas(x) {
	                        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	                    }
	                },
	                xaxis: {
	                    tickDecimals: 0
	                },
	                colors: [colors]
	            });

	        } else {

	            var thisData = [];
	            var thisDataPrediction = [];

	            $.getJSON(endpoint1, function(obj) {
	                var eventdata = obj;
	                var thisTotal = 0;

	                $.each(eventdata.events, function(key, value) {



	                    thisData.push([parseInt(value.xoffset), parseInt(value.xvalue)]);
	                    // Add prediction (Day 2014 * (Day 2012 / Day 2013)-100%) + Day 2014
	                    //(parseInt(value.xvalue) * (Day 2012 / Day 2013)-100%) + parseInt(value.xvalue);

	                    thisDataPrediction.push([parseInt(value.xoffset), parseInt(value.xvalue) + (parseInt(value.xvalue) * total_increase)]);

	                    thisTotal += parseInt(value.xvalue);
	                });

	                // test local storage usage for objects
	                localStorage[localvariable] = JSON.stringify(thisData);
	                localStorage[localvariable + "_prediction"] = JSON.stringify(thisDataPrediction);

	            }).success(function() {

	                //console.log(thisDataPrediction);



	                if (compare === true) {

	                    $.plot("#" + target, [thisData, thisDataPrediction], {
	                        series: {
	                            autoMarkings: autoMarkings,
	                            stack: false,
	                            lines: lines,
	                            points: points
	                        },
	                        grid: {
	                            hoverable: true,
	                            markings: markings
	                        },
	                        tooltip: tooltip,
	                        yaxis: {
	                            tickFormatter: function numberWithCommas(x) {
	                                return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	                            }
	                        },
	                        xaxis: {
	                            tickDecimals: 0
	                        },
	                        colors: [colors]
	                    });

	                } else {

	                    $.plot("#" + target, [thisData], {
	                        series: {
	                            autoMarkings: autoMarkings,
	                            stack: stack,
	                            lines: lines,
	                            points: points
	                        },
	                        grid: {
	                            hoverable: true,
	                            markings: markings
	                        },
	                        tooltip: tooltip,
	                        yaxis: {
	                            tickFormatter: function numberWithCommas(x) {
	                                return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	                            }
	                        },
	                        xaxis: {
	                            tickDecimals: 0
	                        },
	                        colors: [colors]
	                    });

	                };



	            });

	            var retrievedObject = localStorage.getItem(localvariable);
	            console.log('retrievedObject: ', JSON.parse(retrievedObject));

	        }
	    };



	    //getMagpie("DailyTotalPageviews", "https://magpie.bazaarvoice.com/api/pageviews/total?start_date=20131129&end_date=20131129")


	    plotTotal("HistoricalTotal", "/data/index.php?yr=2014&tp=total", "/data/index.php?yr=2014&tp=ugcimpressions", "charttotalhistorical", "#BC0CE8", false, 750000000, 1400000000);
	    plotTotal("HistoricalImpressions", "/data/index.php?yr=2014&tp=ugcimpressions", "", "chartimphistorical", "#3024FF", false, 600000000, 1200000000);
	    plotTotal("HistoricalPageviews", "/data/index.php?yr=2014&tp=Pageviews", "", "chartpagehistorical", "#FF7070", false, 100000000, 225000000);

	    plotTotal("PredictionTotal", "/data/index.php?yr=2014&tp=total", "", "charttotal", "#323233", false, 750000000, 1700000000, true);
	    plotTotal("PredictionImpressions", "/data/index.php?yr=2014&tp=ugcimpressions", "", "chartimpressions", "#ff0000", false, 500000000, 1250000000, true);
	    plotTotal("PredictionPageviews", "/data/index.php?yr=2014&tp=Pageviews", "", "chartpageviews", "#ff0000", false, 500000000, 1250000000, true);
	    plotTotal("PredictionErrors", "/data/index.php", "", "charterrors", "#ff0000", true, 8, 12);
	    plotTotal("PredictionDiagnostics", "/data/index.php", "", "chartdiagnostics", "#ff0000", true, 8, 12);

	    // Add the Flot version string to the footer

	    $("#footer").prepend("Cookie Monster Event Data 1.0 &ndash; ");
	});
