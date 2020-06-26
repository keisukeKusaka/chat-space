$(function(){

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    console.log("keyup発火");
    console.log(input);

    $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
    })
    .done(function(users){
      console.log("done実行");
    })
    .fail(function(){
      console.log("fail実行");
    });
  });
});