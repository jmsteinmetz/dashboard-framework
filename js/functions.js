    function loadTemplate() {

        $.getJSON("/config/board-default.json", function(obj) {
            $("#layout").addClass(obj.options[0].layout);
            $("#copyrightText").html(obj.options[0].copyrightText);

            $.each(obj.report, function(key, value) {
                $(".title").html(value.title);
                $(".date").html(value.start + " - " + value.end);
                $(".client").html(value.client);
                $(".detail").html(value.detail);
            });

            // Sample Data
            $.each(obj.sections, function(key, value) {
                if (value.display == 'yes') {
                    $('#main ').append('<div id="area-' + value.id + '"' + 'class="zone ' + ' col-xs-' + value.xs + ' col-sm-' + value.sm + ' col-md-' + value.md + ' col-lg-' + value.lg + '">' 
                        + '<div class="panel panel-default">' 
                        + '<div class="panel-heading">' 
                        + '<h3 class="panel-title">' + value.title + '&nbsp;<span class="glyphicon glyphicon-info-sign"></span></h3>' 
                        + '</div>' 
                        + '<div class="panel-body">' + ' <canvas id="x-' + value.div + '" ></canvas> ' + '</div>' 
                        + '<div class="panel-footer"><div id="js-legend" class="chart-legend"></div></div>' + '</div>');
                };

                if (value.chartType == 'bar') {

                    var baroptions = {
                        barShowStroke : true,
                        barStrokeWidth : 2,
                        barDatasetSpacing : -2
                    };

                    // Merge options
                    $.extend(options, baroptions);

                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $('#x-' + value.div).get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var myNewChart = new Chart(ctx).Bar(dataBar, options);
                }

                //console.log(eval(value.lineitem))

                if (value.chartType == 'line') {

                    var lineoptions = {
                        datasetFill : true,
                        pointDot : true,
                        datasetStrokeWidth : 4,
                        bezierCurve : true
                    };

                    // Merge options
                    $.extend(options, lineoptions);

                    var dataObject = value.dataObject;
                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $('#x-' + value.div).get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var myNewChart = new Chart(ctx).Line(eval(value.dataObject), options);
                }

                if (value.chartType == 'pie') {
                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $('#x-' + value.div).get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var myNewChart = new Chart(ctx).Pie(eval(value.dataObject), options);
                }

                if (value.chartType == 'stackedbar') {
                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $('#x-' + value.div).get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var myNewChart = new Chart(ctx).StackedBar(eval(value.dataObject), options);
                }

                document.getElementById('js-legend').innerHTML = myNewChart.generateLegend();
            });

            if (obj.options[0].showBorders == 'no') {
                $('.chart').addClass('noborders');
            }
        });


        var options = {
            responsive: true,
            maintainAspectRatio: false,
            scaleShowGridLines : false,
            showScale: false,
            segmentShowStroke : false
        }
    };
