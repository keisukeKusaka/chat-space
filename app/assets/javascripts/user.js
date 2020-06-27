$(function(){

  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  };

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  };

  function moveToChatMember(user_name, user_id) {
    console.log('moveToChatMember実行');
    var html = `
                <div class = 'chat-group-user' id = '${user_id}'>
                  <p class = 'chat-group-user__name'>${user_name}</p>
                  <div class = 'user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id = '${user_id}' data-user-name = '${user_name}'>削除</div>
                </div>`;

    $('.js-add-user').append(html);
    console.log('メンバーに追加したユーザー名→',user_name);
  };

  function addMember(user_id) {
    console.log('addMember実行');
    let html = `<input value = '${user_id}' name = 'group[user_ids][]' type = 'hidden' id = 'group_user_ids_${user_id}' />`
    $(`#${user_id}`).append(html);
  };

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  $('#user-search-result').on('click', '.chat-group-user__btn', function(){
    console.log("メンバーへ追加イベント発火");
    var data_id = $(this).data('user-id');
    var data_name = $(this).data('user-name');
    console.log(data_id, data_name);

    $(this).parent().remove();

    moveToChatMember(data_name, data_id);
    addMember(data_id);
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function(){
    console.log("メンバーから削除イベント発火");
    $(this).parent().remove();
  });

});