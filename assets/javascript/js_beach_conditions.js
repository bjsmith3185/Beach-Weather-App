
$(document).ready(function(){
//--- hide these elements on page load---
    $('#jumbo-results').hide();
    $("#reset-button-bottom").hide();

//----------- on click function----------   
$("#submit").on("click", function() {
//-------- code to hide the jumbotron-----  
    $("#jumbo").hide();
    $("#jumbo-results").show();
    $("#reset-button-bottom").show();
       
//-------- var for city drop down -------
    var city = $("#cities").val();
        //   console.log("this is city " + city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7a966b580102119ddbcfa34b8cdafb5b";
        // console.log("this is url " + queryURL);
       
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //    console.log(response);
        //    console.log("city: " + response.name);
        //    console.log("Currently: " + response.weather[0].description);
        //    console.log("Temperature: " + response.main.temp);
        //    console.log("Humidity: " + response.main.humidity + "%");
        //    console.log("Wind speed: " + response.wind.speed);
        //    console.log("img: " + " https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
   
//------------- populates the dom without a checkbox ----------
        var capitalCity = city.charAt(0).toUpperCase() + city.slice(1);
        $("#city").text("Results for: " + capitalCity);
        $('#display').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
      
 //---------------populate the dom if checkbox is true----------------------------------
       
        var currentConditionStatus = $("#currentConditionID").prop("checked");
            // console.log("this is status for current condition: " + currentConditionStatus);
        if (currentConditionStatus) {
            $("#current").text("Currently: " + response.weather[0].description);
            } else {
                $("#current").text("");
        };
   
        var temperatureStatus = $("#currentTemperatureID").prop("checked");
            // console.log("this is status for temp: " + temperatureStatus);
        if (temperatureStatus) {
            $("#temp").text("Temperature: " + response.main.temp.toFixed() + "°");
            } else {
            $("#temp").text("");
        };
   
        var humidityStatus = $("#humidityID").prop("checked");
            // console.log("this is status for humidity: " + humidityStatus);
        if (humidityStatus) {
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            } else {
            $("#humidity").text("");
        };
   
        var windStatus = $("#windID").prop("checked");
            // console.log("this is status for wind: " + windStatus);
        if (windStatus) {
            $("#wind").text("Wind: " + response.wind.speed.toFixed() + " mph");
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
        //  console.log("this is cityForTide var: " + cityForTide);
 
//-------------- using the current date for api search ---
 
     var now = moment().format('YYYYMMDD');
        // console.log(now);
 
    var beginning = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&datum=MLLW";
    var ending = "&interval=hilo&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json";
    var start = "&begin_date=" + now;
    var end = "&end_date=" + now;
    var queryURLtide = beginning + start + end + cityForTide + ending;
    //  console.log("this is tide url " + queryURLtide);
 
    $.ajax({
        url: queryURLtide,
        method: "GET"
        }).then(function(response) {
        response =JSON.parse(response);
            //console.log(response);            
            //  console.log("this is high tide: " + response.predictions[0].t);
            //  console.log("this is low tide: " + response.predictions[1].t);
            //  console.log("this is high tide: " + response.predictions[2].t);
            //  console.log("this is low tide: " + response.predictions[3].t);
 
// inserting the new function from page practice tides api.html
 
        var length = response.predictions.length;
            // console.log("this is length: " + length);
            // console.log( response);
        var x = response.predictions;
        var lowTide1;
        var lowTide2;
        var highTide1;
        var highTide2;

// function to search thru the api object and identify the high and low tide info --

        function determineHighOrLowTide(x,length) {
            for(var i = 0; i < length; i++ ) {
                // console.log("this is type inside the for loop: " + x[i].type)
                if (x[i].type === "L") {
                    if(i <= 1) {
                        lowTide1 = convertTime24to12(x[i].t.substr(11,5));
                        // console.log("this is lowTide1 var: " + lowTide1);
                    } else if (i > 1) {
                        lowTide2 = convertTime24to12(x[i].t.substr(11,5));
                    }
                } else if (x[i].type === "H") {
                    if (i <= 1) {
                        highTide1 = convertTime24to12(x[i].t.substr(11,5));
                        // console.log("@@@@@ " + x[i].t);
                    } else if (i > 1) {
                        highTide2 = convertTime24to12(x[i].t.substr(11,5));
                    }
                }
            }
        };
        
        determineHighOrLowTide(x,length);
   
            // console.log("this is low tide 1: " + lowTide1);
            // console.log("this is low tide 2: " + lowTide2);
            // console.log("this is high tide 1: " + highTide1);
            // console.log("this is high tide 2: " + highTide2);

        var highTide2withAnd = " & " + highTide2;
        var lowTide2withAnd = " & " + lowTide2;

            //  var highTide1 = convertTime24to12(response.predictions[0].t.substr(11,5));
            //  var lowTide1 = convertTime24to12(response.predictions[1].t.substr(11,5));
            //  var highTide2 = convertTime24to12(response.predictions[2].t.substr(11,5));
            //  var lowTide2 = convertTime24to12(response.predictions[3].t.substr(11,5));
          
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
     
//--------new code to populate the dom ----------

        var tidesID = $("#tidesID").prop("checked");
            if (tidesID) {
                if (length === 3) {
                    if (highTide2 === undefined) {
                        $("#high-tide1").text("High Tide: " + highTide1);
                        $("#low-tide1").text("Low Tide: " + lowTide1 + lowTide2withAnd);
                    } else if (lowTide2 === undefined) {
                        $("#high-tide1").text("High Tide: " + highTide1 + highTide2withAnd);
                        $("#low-tide1").text("Low Tide: " + lowTide1);
                        }

                } else if (length === 4) {
                    $("#high-tide1").text("High Tide: " + highTide1 + highTide2withAnd);
                    $("#low-tide1").text("Low Tide: " + lowTide1 + lowTide2withAnd);
                    } 

            } else {
                $("#high-tide1").text("");
                $("#low-tide1").text("");
            };
 
    });  // --- end of high and low tide api call

// ------------- 2nd tides and currents api call for water temp ------

    
    var beginningWaterTemp = "https://tidesandcurrents.noaa.gov/api/datagetter?product=water_temperature";
    var endingWaterTemp = "&station=8665530&units=english&time_zone=gmt&application=ports_screen&format=json";
    var queryURLwatertemp = beginningWaterTemp + start + end + endingWaterTemp;
        // console.log("this is water-temperature url " + queryURLwatertemp);
 
    $.ajax({
        url: queryURLwatertemp,
        method: "GET"
        }).then(function(response) {
            response =JSON.parse(response);
                // console.log("response for water-temp api: " + response);     
            
            var waterTemperature = response.data[1].v.toFixed();
                // console.log("water-temperature: " + waterTemperature);

            var waterTemperatureID = $("#waterTemperatureID").prop("checked");
            if(waterTemperatureID) {
                $("#water-temperature").text("Water Temp: " + waterTemperature + "°");
            } else {
                $("#water-temperature").text("");
            }
    }); //---- end of 2nd ajax call for water temp

}); // end of the onclick function "submit"

// ------------Reset Button --------
   
    $("#reset-button-city-search").on("click", function() {

        $("#jumbo-results").hide();
        $("#jumbo").show();
        $("#currentConditionID").prop("checked", "checked");  
        $("#currentTemperatureID").prop("checked", "checked");  
        $("#humidityID").prop("checked", "checked");
        $("#windID").prop("checked", "checked");
        $("#waterTemperatureID").prop("checked", "checked");
        $("#tidesID").prop("checked", "checked");
        $("#reset-button-bottom").hide();

    }); //--- end of reset button function
      
}); // end of document.ready
 