$(function(){
  $('#new_message').on('submit', function(e){
    console.log("イベント発火");
    e.preventDefault();
  });
});