$(function(){     //.messageというクラスがつけられた全てのノードのうち一番最後のノード
 function buildHTML(message){
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
 };
 $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html=buildHTML(data);
    $('.chat-main__middle').append(html);
    $('.chat-main__middle').animate({scrollTop: $('.chat-main__middle')[0].scrollHeight});
    $('form')[0].reset();
    $('.form__submit').prop('disabled',false);
  })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  })
 });
 var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id"); //カスタムデータ属性を利用し最新メッセージのidを取得
  $.ajax({
    url: "api/messages",   //リクエストしたいのは/groups/id番号/api/messages
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}   //dataオプションでリクエストに値を含める
  })
  .done(function(messages) {
   if(messages.length !==0){
    var insertHTML = '';          //入れ物を作る
    $.each(messages, function(i, message) {   //配列の中身を取り出し、HTMLに変換して入れ物に足す
      insertHTML += buildHTML(message)
    });
    $('.chat-main__middle').append(insertHTML);        //HTMLに、入れ物ごと追加
    $('.chat-main__middle').animate({ scrollTop: $('.chat-main__middle')[0].scrollHeight});
    $("#new_message")[0].reset();    //自動スクロール、フォーム内を空、フォームを再度送信可能
    $(".form__submit").prop("disabled", false);
   } 
  })
  .fail(function() {
    alert('error');
  });
 };
 if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
 }
});