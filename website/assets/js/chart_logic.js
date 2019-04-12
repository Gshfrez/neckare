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

/*
Generates a sequence of values which
start at starting_pain
end at ending_pain
decreasing over the period of cure_time
but the sequence covers the period of total_duration
and randomly varies from those values with maximum magnitude of noise_magnitude
*/
function generate_pain_element(starting_pain, ending_pain, cure_time, total_duration, noise_magnitude)
{
    var MIN_PAIN = 0
    var MAX_PAIN = 10

    var pain_array = []

    for (var i = 0; i < cure_time; i++)
    {
        //random is -1 < x < +1
        random = 2*(Math.random() - 0.5)
        noise = noise_magnitude * random
        current_pain_expected = (i / cure_time) * (ending_pain - starting_pain) + ending_pain
        current_pain_actual = Math.round(current_pain_expected + noise)
        if (current_pain_actual < MIN_PAIN) {
            current_pain_actual = MIN_PAIN
        }
        else if (current_pain_actual > MAX_PAIN) {
            current_pain_actual = MAX_PAIN
        }
        pain_array.push(current_pain_actual)
    }
    for (var i = cure_time; i < total_duration; i++)
    {
        random = 2*(Math.random() - 0.5)
        noise = noise_magnitude * random
        current_pain_expected = ending_pain
        current_pain_actual = Math.round(current_pain_expected + noise)
        if (current_pain_actual < MIN_PAIN) {
            current_pain_actual = MIN_PAIN
        }
        else if (current_pain_actual > MAX_PAIN) {
            current_pain_actual = MAX_PAIN
        }
        pain_array.push(current_pain_actual)

    }

	return pain_array
}


// generate data
var MONTHS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var config = {
  type: 'line',
  data: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
      label: 'My Neck Pain',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      data: generate_pain_element(8,3,30,60,1),
      fill: false,
    }, {
      label: 'My Shoulder Pain',
      fill: false,
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      data: generate_pain_element(7,2,50,60,1),
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