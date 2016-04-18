$('#send').on('click',function(){
  console.log("hey");
  $('#envelope div:nth-child(2)').addClass('sending');
  var name = $('#name').val();
  $('#envelope').append('<div  class="callback">Thanks!</div>');
});
