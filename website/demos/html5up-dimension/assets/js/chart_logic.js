$(document).ready(function() {
  $("#pain").click(function() {
    $("#removeData").click(function() {
      config.data.labels.splice(-1, 1); // remove the label first

      config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
      });

      window.myLine.update();
    });


    $("#addData").click(function() {
      if (config.data.datasets.length > 0) {
        var month = MONTHS[config.data.labels.length % MONTHS.length];
        config.data.labels.push(month);

        config.data.datasets.forEach(function(dataset) {
          dataset.data.push(randomScalingFactor());
        });

        window.myLine.update();
      }
    });
  });
});

var MONTHS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var config = {
  type: 'line',
  data: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
      label: 'My Neck Pain',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
      fill: false,
    }, {
      label: 'My Shoulder Pain',
      fill: false,
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'My Pain Levels'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Pain'
        }
      }]
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
};


var colorNames = Object.keys(window.chartColors);