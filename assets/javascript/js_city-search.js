

$(document).ready(function(){
  $('#jumbo-results').hide();
  
  
  $("#submit").on("click", function() {
//-------- code to hide the jumbotron-----  
    $("#jumbo").hide();
    $("#jumbo-results").show();
    
    var city = $("#input").val();
    console.log("this is " + city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7a966b580102119ddbcfa34b8cdafb5b";
    console.log("this is url " + queryURL);


   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log("city: " + response.name);
        console.log("Currently: " + response.weather[0].description);
        console.log("Temperature: " + response.main.temp);
        console.log("Humidity: " + response.main.humidity + "%");
        console.log("Wind speed: " + response.wind.speed);
        console.log("Sunrise: " + changeTime(response.sys.sunrise));
        console.log("Sunset: " + changeTime(response.sys.sunset));
        console.log("img: " + " https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

//------------- populates the dom without a checkbox ----------

    $("#city").text("Results for: " + response.name + " , " + response.sys.country);
    $('#display').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");


//---------------populate the dom if checkbox is true----------------------------------

   
         var currentConditionStatus = $("#currentConditionID").prop("checked");
         console.log("this is status for current condition: " + currentConditionStatus);
         if (currentConditionStatus) {
             $("#current").text("Currently: " + response.weather[0].description);
            } else {
                $("#current").text("");
        };

         var temperatureStatus = $("#currentTemperatureID").prop("checked");
         console.log("this is status for temp: " + temperatureStatus);
         if (temperatureStatus) {
            $("#temp").text("Temperature: " + response.main.temp);
            } else {
            $("#temp").text("");
         };

        var humidityStatus = $("#humidityID").prop("checked");
        console.log("this is status for humidity: " + humidityStatus);
        if (humidityStatus) {
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            } else {
            $("#humidity").text("");
        };

        var windStatus = $("#windID").prop("checked");
        console.log("this is status for wind: " + windStatus);
        if (windStatus) {
            $("#wind").text("Wind speed: " + response.wind.speed);
            } else {
            $("#wind").text("");
        };

        var sunriseStatus = $("#sunRiseID").prop("checked");
        console.log("this is status for sunrise: " + sunriseStatus);
        if (sunriseStatus) {
            $("#sunrise").text("Sunrise: " + changeTime(response.sys.sunrise));
            } else {
            $("#sunrise").text("");
        };

        var sunsetStatus = $("#sunSetID").prop("checked");
        console.log("this is status for sunset: " + sunsetStatus);
        if (sunsetStatus) {
            $("#sunset").text("Sunset: " + changeTime(response.sys.sunset));
            } else {
            $("#sunset").text("");
        };
    }); // end of ajax function
//----------------------------------------------------------------

  // function to change time from unix to hh:mm
  function changeTime(pass) {   
    var a = new Date(+pass * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = hour + ":" + min;
    return time;
    console.log(time);
    };
}); // end of on.click


// ------------Reset Button --------
    // clear the input field 
    // check all boxes 
    // hide results container 
    // show jumbotron 

  $("#reset-button-city-search").on("click", function() {

        $("#jumbo-results").hide();
        $("#jumbo").show();
        $("#currentTemperatureID").prop("checked", "checked");  
        $("#humidityID").prop("checked", "checked");
        $("#windID").prop("checked", "checked");
        $("#sunRiseID").prop("checked", "checked");
        $("#sunSetID").prop("checked", "checked");
        $("#input").val("Search for City");
   
  });
   
    
   
 

  
     
   

   

}); // end of document.ready
























// $("#current").text("Currently: " + response.weather[0].description);
//     $("#temp").text("Temperature: " + response.main.temp);
//     $("#humidity").text("Humidity: " + response.main.humidity + "%");
//     $("#wind").text("Wind speed: " + response.wind.speed);
//     $("#sunrise").text("Sunrise: " + changeTime(response.sys.sunrise));
//     $("#sunset").text("Sunset: " + changeTime(response.sys.sunset));

//     $('#display').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");

