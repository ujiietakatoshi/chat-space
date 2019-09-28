$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name }</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</div>
      </div>`
    search_list.append(html);
    return html;
   }

  function appendUserToMemberList(name, user_id) {
    var html = 
      `<div class="chat-group-user">
        <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
        <p class="chat-group-user__name">${ name }</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
    member_list.append(html);
  }

  function appendNoUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user }</p>
      </div>`
    search_list.append(html);
  }

  var usersname = [];

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var group_id = $('.chat__group_id').val();
    $('.chat-group-user__selected_user_id').each(function(){
      groupId.push(groupId);
    });

    if (input.length){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, groupId: group_id},
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){if(usersname.indexOf(user.name) === -1){
              appendUserToSearchList(user);
            }});
          }
          else {
            appendNoUserToSearchList("一致するユーザーはいません");
          }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
      }
    else {
      $("#user-search-result").empty();
    }
  });

  $(function(){
    $(document).on('click', '.user-search-add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      usersname.push(name)
      $(this).parent().remove();
      appendUserToMemberList(name, user_id);
    });
      $(document).on("click", '.user-search-remove', function() {
        for(i=0; i<usersname.length; i++){
          if(usersname[i] == name){
          usersname.splice(i,1);
          }
      $(this).parent().remove();
      }});
  });
});