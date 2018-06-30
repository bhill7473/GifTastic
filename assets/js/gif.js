$(document).ready(function(){


var topics = ["asteroids","planets","robots","space","ocean","mountains","grass","tree","fish","sharks","fire","beach",
"sun","earth","pool","stars","wind","football"];

// animate on click, align pictures in static order fix input search
 $(document).on("click", ".topic-image", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

         });  

 function renderButtons() {
    
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("gif");
          a.attr("data-gif", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

  $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();    
        $("#topic-input").val("");        
      
     
  });
   $(document).on("click",".gif", function() {
 	 $("#gifs-appear-here").empty();
      var topic = $(this).attr("data-gif");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var topicImage = $("<img>");
            topicImage.attr("src", still);
            topicImage.attr("data-still", still);
            topicImage.attr("data-animate", animated);
            topicImage.attr("data-state", "still");
            topicImage.addClass("topic-image");
            gifDiv.prepend(p);
            gifDiv.prepend(topicImage);
            $("#gifs-appear-here").prepend(gifDiv);
           
           }
          
 
         });
       });
       renderButtons();
    });




  