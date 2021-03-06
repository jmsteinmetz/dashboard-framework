$(function() {

    Chart.types.Bar.extend({
        name: "BarAlt",
        initialize: function(data) {
            Chart.types.Bar.prototype.initialize.apply(this, arguments);

            if (this.options.curvature !== undefined && this.options.curvature <= 1) {
                var rectangleDraw = this.datasets[0].bars[0].draw;
                var self = this;
                var radius = this.datasets[0].bars[0].width * this.options.curvature * 0.5;

                // override the rectangle draw with ours
                this.datasets.forEach(function(dataset) {
                    dataset.bars.forEach(function(bar) {
                        bar.draw = function() {
                            // draw the original bar a little down (so that our curve brings it to its original position)
                            var y = bar.y;
                            // the min is required so animation does not start from below the axes
                            bar.y = Math.min(bar.y + radius, self.scale.endPoint - 1);
                            // adjust the bar radius depending on how much of a curve we can draw
                            var barRadius = (bar.y - y);
                            rectangleDraw.apply(bar, arguments);

                            // draw a rounded rectangle on top
                            Chart.helpers.drawRoundedRectangle(self.chart.ctx, bar.x - bar.width / 2, bar.y - barRadius + 1, bar.width, bar.height, barRadius);
                            ctx.fill();

                            // restore the y value
                            bar.y = y;
                        }
                    })
                })
            }
        }
    });


    var options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowGridLines: false,
        showScale: false,
        segmentShowStroke: false
    }

    var baroptions = {
        barShowStroke: false,
        barStrokeWidth: 0,
        barDatasetSpacing: 8,
        barValueSpacing: 8,
        curvature: 1
    };

    // Merge options
    $.extend(options, baroptions);

    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $('#x-linechart-1001').get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx).BarAlt(dataBarSingle, options);


});
