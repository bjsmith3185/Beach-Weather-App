$(document).ready(function(){
    $('#jumbo-results').hide();

$("#submit").on("click", function() {

    $("#jumbo").hide();
    $("#jumbo-results").show();

    var city = $("#input").val();
    console.log("this is " + city);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=7a966b580102119ddbcfa34b8cdafb5b";
    console.log("this is url " + queryURL);

    // make the city have a capital letter for the dom
    var capitalCity = city.charAt(0).toUpperCase() + city.slice(1);

    $("#city").text("Results for: " + capitalCity);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          
  var counter = 0;
  for (var i=0;i <response.list.length; i++) {
     // console.log(response.list.length);
      var last2 = (response.list[i].dt_txt).substring(11,13);
    // console.log(last2);
      if ( last2 === "06") {
        //  console.log(response.list[i].dt_txt);
          var lowTemp = response.list[i].main.temp_min;
          console.log("low temp " + lowTemp);
          counter++;
          console.log("this is the count " + counter);
      }
  
      if ( last2 === "15") {
         // console.log(response.list[i].dt_txt);
          var hiTemp = response.list[i].main.temp_max;
          console.log("hi temp " + hiTemp);
          var date = (response.list[i].dt_txt).substring(5,11);
          console.log(date);
          var humidity = response.list[i].main.humidity;
          console.log(humidity);
          var description = response.list[i].weather[0].description;
          console.log(description);
      
          $(".each-day").append("<div class='fiveDay' id='day-"+counter+"'>Date: <span>" + date + "</span> Condition: <span>" + description + "</span></div>");
          $(".each-day").append("<div class='fiveDay' id='temp-"+counter+"'>High: <span>" + hiTemp + "</span> Low: <span>" + lowTemp + "</span></div>");
          $(".each-day").append("<div class='fiveDay' id=humidity-"+counter+"'>Humidity: <span>" + humidity + "% </span></div><br>");
  
        
        
  
  }
  //<div id="day-i">date:<span>date</span>Condition:<span>condition</span></div>
  
         
  
  
  
   }
  });

});

}); // document open end