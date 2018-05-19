

$(document).ready(function(){
   $('#jumbo-results').hide();
    
    
    $("#submit").on("click", function() {
  //-------- code to hide the jumbotron-----  
     $("#jumbo").hide();
   $("#jumbo-results").show();
      
//-------- var for city drop down -------

       var city = $("#cities").val();
        
        console.log("this is city " + city);
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
          console.log("img: " + " https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        





     
  
  
     
     
  
//   //------------- populates the dom without a checkbox ----------
var capitalCity = city.charAt(0).toUpperCase() + city.slice(1);
       $("#city").text("Results for: " + capitalCity);
       $('#display').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
  
  
//   //---------------populate the dom if checkbox is true----------------------------------

     
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
  
          
      }); // end of ajax function

    //--------- beginning of high and low tide api call
    var cityForTide;
 
    if (city === "wrightsville") {
        cityForTide = "&station=8658163";
    } else if (city === "north myrtle beach") {
        cityForTide = "&station=8661070";
    } else if (city === "myrtle beach") {
        cityForTide = "&station=8661070";
    } else if (city === "charleston") {
        cityForTide = "&station=8665530";
    };
    console.log("this is cityForTide var: " + cityForTide);

    //-------------- using the current date for api search ---

    var now = moment().format('YYYYMMDD');

    console.log(now);



    var beginning = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&datum=MLLW";
    var ending = "&interval=hilo&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json";
    var start = "&begin_date=" + now;
    var end = "&end_date=" + now;

    // var start = "&begin_date=20180517";
    // var end = "&end_date=20180518";

    var queryURLtide = beginning + start + end + cityForTide + ending;
    console.log("this is tide url " + queryURLtide);

      $.ajax({
        url: queryURLtide,
        method: "GET"
        }).then(function(response) {
            response =JSON.parse(response);
            //console.log(response);            
            console.log("this is high tide: " + response.predictions[0].t);
            console.log("this is low tide: " + response.predictions[1].t);
            var highTide1 = convertTime24to12(response.predictions[0].t.substr(11,5));
            var lowTide1 = convertTime24to12(response.predictions[1].t.substr(11,5));
            var highTide2 = convertTime24to12(response.predictions[2].t.substr(11,5));
            var lowTide2 = convertTime24to12(response.predictions[3].t.substr(11,5));
         
            //------------ function to change 24hr to 12hr time ---
                function convertTime24to12(time24){
                    var tmpArr = time24.split(':'), time12;
                    if(+tmpArr[0] == 12) {
                        time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
                    } else {
                        if(+tmpArr[0] == 00) {
                            time12 = '12:' + tmpArr[1] + ' am';
                        } else {
                            if(+tmpArr[0] > 12) {
                                time12 = (+tmpArr[0]-12) + ':' + tmpArr[1] + ' pm';
                            } else {
                                time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
                                }
                            }
                        }
                    return time12;
                };
        //----------- end of 24 to 12hr time function---------
        
            
            var tidesId = $("#tidesID").prop("checked");
            if (tidesID) {
                $("#high-tide1").text("High Tide: " + highTide1 + " & " + highTide2);
                $("#low-tide1").text("Low Tide: " + lowTide1 + " & " + lowTide2);
                } else {
                $("#high-tide1").text("");
                $("#low-tide1").text("");
            };

        });  // --- end of high and low tide api call

    }); // end of the onclick function "submit"

//   // ------------Reset Button --------
  
    $("#reset-button-city-search").on("click", function() {
  
        $("#jumbo-results").hide();
        $("#jumbo").show();
        $("#currentConditionID").prop("checked", "checked");  
        $("#currentTemperatureID").prop("checked", "checked");  
        $("#humidityID").prop("checked", "checked");
        $("#windID").prop("checked", "checked");
        $("#waterTemperatureID").prop("checked", "checked");
        $("#tidesID").prop("checked", "checked");
        //   $("#input").val("Search for City");
 
    });
     
  }); // end of document.ready
  
  


// put the search col-xs-4 inside a new container and give it CSS. 
// rename the #jumbo container so it doesnt take up the entire 12 cols 
  