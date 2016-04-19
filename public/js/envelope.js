$('#send').on('click',function(){
  console.log("hey");
  $('#envelope div:nth-child(2)').addClass('sending');
  $('#envelope').append('<p class="callback">Thanks!</p>');
})
