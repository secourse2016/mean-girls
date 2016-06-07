$('#send').on('click',function(){
  $('#envelope div:nth-child(2)').addClass('sending');
  $('#envelope').append('<p class="callback">Thanks!</p>');
})
