$(document).ready(function() {
  var credits = 0;

  $("#addData").click(function() {
    credits += 1;
    $("#credits").html("Credits: " + credits)
    $("#credits2").html("Credits: " + credits)
  });

  $("#removeData").click(function() {
    if (credits > 0)
    {
      credits -= 1;
      $("#credits").html("Credits: " + credits)
      $("#credits2").html("Credits: " + credits)
    }
  })

});