$(function(){
  //これは関数というよりHTML要素が全て読み込み終わったタイミングでjsファイルの処理を実行してくれるおまじないのようなもの
    function buildHTML(message){
  //functionによって関数の宣言 buildHTMlは関数の名前 messageは引数
  //function 関数名 (引数){関数を定義する文}
  //if文の条件について${message.image}としたらuncaught token error {となった。
      var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      var html = `<div class=message>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                        ${message.created_at}
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
  //htmlという変数を作った
  //代入するものは複数行に渡るのでテンプレートリテラル記法によって書く
  
    $('#new_message').on('submit', function(e){
  //$はjQueryという文字を省略したものとも考えられる
  //onメソッドは第一引数にイベント名、第2引数にそのイベントが実行された時に実行されるfunctionを指定できる
  //submitイベントが起きた時
      e.preventDefault();
      var formData = new FormData(this);
  //ここでのnewはJavascriptのnew演算子  新たなインスタンスを作ることができる
  //FormDataオブジェクトクラスのインスタンスを作成
  //FormDataオブジェクトはフォームのデータの送信に使用できる
  //ここではフォームの情報を取得するのに使う
  //イベントで設定したfunction内でthisを利用した場合はそのthisはイベントが発生したDOM要素を示す ここではnew_messageというIDがついたフォームの情報を取得している
      var href = window.location.href
  //hrefという変数を作った
  //windowオブジェクトとは画面上に表示されている全てのオブジェクトの親となるオブジェクト
  //locationオブジェクトはwindowオブジェクションの一部であり、window.locationプロパティを通じてアクセスできる。locationオブジェクトのプロパティの一つであるhrefはurl全体という意味
  //なぜajaxメソッドに入る前にformDataやhrefなど変数を定義するのか？
  //なぜならajaxメソッドで使用するため
      $.ajax({
  //jqueryのAjaxメソッドを使用 つまり詳しく書くとjQuery.ajax()
  //Jquery.ajaxメソッドを簡単に使えるようにしたのがJquary.getメソッド
  //ここではデータを受け取っている つまりサーバーからデータを取得
  //ajaxメソッドによってJavascriptからhttpリクエストを発行できる
  //ajaxメソッドによってサーバー側にgetメソッドでアクセスする
        url: href,
  //urlによって通信先のURLを指定、デフォルトでは現在のページ
        type: "POST",
  //通信に使用するhttpメソッド
        data: formData,
  //上で宣言された変数であるformDataを送信するということ
  //dataオプションでサーバに送信する値を決める
        dataType: 'json',
  //応答データをJson形式にするということ
        processData: false,
        contentType: false
      })
      .done(function(data){
  //ここで引数がthisではなくてdataになっているのはajaxメソッドでdataオプションを選択したからだと思う そもそもthisってのはJavascriptの文法の一つであるのに対しここのdデータはjson形式だからthisは使えない？？？
  //関数はオブジェクトである
  //doneメソッドはjqXHRオブジェクトによって定義されている
  //本当はdeffered.doneメソッド
  //コールバック関数とは後から呼び出せる関数のこと
  //promiseとdifferedの違い differedは３状態をもつ
  //promiseはdefferedの機能制限版
  //doneメソッドはdeferredオブジェクト（promiseオブジェクトとjqXHRオブジェクトを含む)に使用できる
  //帰ってきたJSONをdoneメソッドで受け取る
  //即時関数の第一引数になっているdataとは？サーバーから返ってくるデータのこと（今回はjbuilderで作成したcreate.json.jbuilderのデータのこと）
        var html = buildHTML(data);
  //htmlという変数にcreate.json.jbuilderのデータを代入する
        $('.messages').append(html);
  //appendメソッドとは？→$(‘セレクタ’).append(‘追加するもの’);
  //val()はvalue属性を取得、操作することができる
  //引数ありで呼ぶことで中身をその値に帰ることができる
       $( ".form__submit").prop( "disabled", false );
  
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  //console.logで調べてみるとscrollHeightは95pxづつ増えていた
  //scrollHeigUncaught TypeError: messages.forEach is not a functiohtメソッドはJqueryのメソッドなのでDOM要素をJqueryに変換しないといけない
       $('.form__message').val('');
       $('.hidden').val('');
      })
     .fail(function(){
  //サーバーエラー(通信に失敗した時)fail関数が呼ばれる
        alert('error');
      })
  //$.ajax().doneまたは$.ajax().failとなっている
    })
  //ここでsubmitにonした時の一連の流れは終わり
  });
  //ここでjsファイルの記述終わり