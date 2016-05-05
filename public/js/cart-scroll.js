$(document).scroll(function() {
    checkOffset();
});

function checkOffset() {
    if($('#pricing-table').offset().top + $('#pricing-table').height()
                                           >= $('#footer').offset().top - 5)
        $('#pricing-table').css('position', 'absolute');
    if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top)
        $('#pricing-table').css('position', 'fixed'); // restore when you scroll up
}
