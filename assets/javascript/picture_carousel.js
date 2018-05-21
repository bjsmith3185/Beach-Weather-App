$(document).ready(function(){
    $('#beach-carousel').hide();
    $('#golf-carousel').hide();
    $('#shopping-carousel').hide();
    $('#eatting-carousel').hide();
    $("#reset-button-bottom").hide();
     
     
     $("#submit").on("click", function() {
   //-------- code to hide the search container -----  
      $("#search-container").hide();
      $("#reset-button-bottom").show();
    
 //-------- var for search drop down -------
 
        var search = $("#carousel-search").val();
        console.log("this is search: " + search);
       
        if (search === "beach-carousel") {
            $("#beach-carousel").show();
        } else if (search === "shopping-carousel") {
            $("#shopping-carousel").show();
        } else if (search === "golf-carousel") {
            $("#golf-carousel").show();
        } else if (search === "eatting-carousel") {
            $("#eatting-carousel").show();
        };

     }); // end of the onclick function "submit"
 
 //   // ------------Reset Button --------
   
     $("#reset-button-city-search").on("click", function() {
   
         $("#beach-carousel").hide();
         $("#shopping-carousel").hide();
         $("#golf-carousel").hide();
         $("#eatting-carousel").hide();
         $("#search-container").show();
         $("#reset-button-bottom").hide();
         





 
  
     });
      
   }); // end of document.ready
   
   
 
 
 // put the search col-xs-4 inside a new container and give it CSS. 
 // rename the #jumbo container so it doesnt take up the entire 12 cols 
   