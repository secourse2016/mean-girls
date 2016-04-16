var $mainButton = $(".main-button"),
$closeButton = $(".close-button"),
$buttonWrapper = $(".button-wrapper"),
$ripple = $(".ripple"),
$layer = $(".layered-content");

$mainButton.on("click", function(){
  $ripple.addClass("rippling");
  $buttonWrapper.addClass("clicked").delay(1000).queue(function(next){
    console.log("here");
    $layer.addClass("active");
    next();
  });
});

$closeButton.on("click", function(){
  $buttonWrapper.removeClass("clicked");
  $ripple.removeClass("rippling");
  $layer.removeClass("active");
});
