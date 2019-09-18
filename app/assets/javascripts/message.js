$(function(){
    function buildHTML(message){
      var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      var html = `<div class="message" data-message-id=${message.id}>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                        ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                        ${imagehtml}
                      </div>
                    </div> `
      return html;
    }
  
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $( ".form__submit").prop( "disabled", false );
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('.new_message')[0].reset();
      })
     .fail(function(){
        alert('何でそんなことするんですか？');
        $( ".form__submit").prop( "disabled", false );
      })
    })
      var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
          var last_message_id = $('.message:last').data('message-id');
          $.ajax({
            url: 'api/messages',
            type: 'get',
            dataType: 'json',
            data: {id: last_message_id}
          })
          .done(function(messages) {
            var insertHTML = '';
            messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
          .fail(function() {
            console.log('error');
          })
        }
        else {
          clearInterval(reloadMessages);
        }
      }
  setInterval(reloadMessages, 1000);
});