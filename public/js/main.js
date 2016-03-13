console.log("This is connected");


$('#get-started').click(function() {
  $('.signup').toggleClass('hidden');
  $('#home-btns').addClass('hidden');
})

$('.cancel').click(function() {
  $('.signup').toggleClass('hidden');
  $('#home-btns').removeClass('hidden');
})
