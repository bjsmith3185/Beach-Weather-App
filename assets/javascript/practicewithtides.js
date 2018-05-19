
// high and low tides
//https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20180512&end_date=20180513&datum=MLLW&station=8661070&time_zone=lst_ldt&units=english&interval=hilo&format=json

// var beginDate = "&begin_date=20180511";
// var endDate = "&end_date=20180512";
// var today = "date=today"

var springmaid = "&station=8661070";
var wrightsville = "&station=8658163";  
var charleston = "&station=8665530"; 

// air temperature
//var airTemp = "&product=air_temperature";    
// water temperature
//var waterTemp = "&product=water_temperature";   
// wind
//var wind = "&product=wind";
// humidity
//var humidity = "&product=humidity";
//var tides = "&interval=hilo";


var beginning = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&datum=MLLW";
var ending = "&interval=hilo&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json";
var start = "&begin_date=20180517";
var end = "&end_date=20180518";
//var station = "&station=8661070";

// var queryURLtide = beginning + start + end + charleston + ending;

//   console.log("this is tide url " + queryURLtide);

 //   var queryURLwaterTemp = "https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20180511&end_date=20180512&station=8665530&product=water_temperature&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json"

  //  var queryURLair = "https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20180511&end_date=20180512&station=8665530&product=air_temperature&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json"

  //  var queryURLwind = "https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20180511&end_date=20180512&station=8665530&product=wind&units=english&time_zone=lst&application=NOS.COOPS.TAC.WL&format=json"

  var city = "&station=8661070";
  var queryURLtide;

// $("#submit").on("click", function() {
//   city = $("#city-name").val();
//   console.log(city);

  queryURLtide = beginning + start + end + city + ending;
  console.log("this is tide url " + queryURLtide);
    
//  $.ajax({
//     url: queryURLtide,
//     method: "GET"
//   }).then(function(response) {
//      // console.log(response);

//      response =JSON.parse(response);
//      console.log(response);
   
//       console.log("this is high tide: " + response.predictions[0].t);
//       console.log("this is low tide: " + response.predictions[1].t);

// //       // $("#highTide").text("high tide: " + response.predictions[0].t);
// //       // console.log(response.predictions[0].t);
// //     //  $("#lowTide").text("low tide: " + response.predictions[1].t);
//    });
// });

console.log(city);



  


