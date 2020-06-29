$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message-block" data-message-id=${message.id}>
                    <div class="message-block__info">
                      <div class="info-name">
                        ${message.user_name}
                      </div>
                      <div class="info-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-block__message">
                       ${message.content}
                      <img src=${message.image} >
                    </div>
                  </div>`      
      return html;
    } else {
      var html = `<div class="message-block" data-message-id=${message.id}>
                    <div class="message-block__info">
                      <div class="info-name">
                        ${message.user_name}
                      </div>
                      <div class="info-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-block__message">
                       ${message.content}
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done (function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-list').animate({scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.send-btn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message-block:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      };
    })
    .fail(function(){
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});