
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('data-model')).offset().top -100
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});
