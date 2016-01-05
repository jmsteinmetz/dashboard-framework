        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100)
        };
        var randomColorFactor = function() {
            return Math.round(Math.random() * 255)
        };

        var dataBar = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(254,189,105,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(254,189,105,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }, {
                label: "My Second dataset",
                fillColor: "rgba(54,191,199,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(54,191,199,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        };

        var dataBarSingle = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct"],
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(254,189,105,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(254,189,105,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [65, 59, 80, 81, 56, 55, 40, 29, 44, 60]
            }]
        };

        var dataStacked = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                fillColor: "rgba(254,189,105,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(254,189,105,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
                fillColor: "rgba(54,191,199,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(54,191,199,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
                fillColor: "rgba(250,105,86,1)",
                strokeColor: "rgba(255,255,255,0)",
                highlightFill: "rgba(54,191,199,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]
        };

        var line1 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Pageviews 2015",
                fillColor: "rgba(254,189,105,.7)",
                strokeColor: "rgba(255,255,255,.5)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [50, 75, 65, 22, 25, 30, 39, 66, 61, 54, 36, 50]
            }, {
                label: "Pageviews 2014",
                fillColor: "rgba(54,191,199,.7)",
                strokeColor: "rgba(255,255,255,.5)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [18, 20, 30, 38, 44, 55, 60, 45, 54, 59, 69, 60]
            }]
        };

        var line2 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Pageviews 2015",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,.4)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [30, 34, 40, 22, 22, 22, 44, 30, 45, 60, 25, 39]
            }, {
                label: "Pageviews 2014",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [22, 45, 80, 49, 38, 36, 40, 50, 29, 38, 45, 60]
            }]
        };

        var dataPie = [{
            value: 300,
            color: "#febd69",
            highlight: "#f1f2e2",
            label: "Brand X"
        }, {
            value: 50,
            color: "#fa6956",
            highlight: "#f1f2e2",
            label: "Brand Y"
        }, {
            value: 100,
            color: "#36bfc7",
            highlight: "#f1f2e2",
            label: "Brand Z"
        }];
