
function Function(){
//var　sheet =  SpreadsheetApp.getActiveSheet()
//  // 自動返信するメール件名
//var regBiz = new RegExp('文章' + '.*?')
//var regex = new RegExp('所感.*?')
//var re = new RegExp('score.*?}')
//  // 最大スレッド数
//  var MAX_THREADS = 30;// 
//  var cnt = 0;  
// 
//// 受信トレイのメッセージを取得する  
//var threads = GmailApp.getInboxThreads(0, MAX_THREADS);  
//Logger.log("len="+threads.length); 
const API_KEY = PropertiesService.getScriptProperties().getProperty("key");
const A3RT_KEY = PropertiesService.getScriptProperties().getProperty("a3rt");
 // POST API
function analyzeEntities(content){
  var data = {
    'document' : {
      'type' : 'PLAIN_TEXT',
      'language' : 'ja',
      'content' : content
    },
    'encodingType': 'UTF8'
  }; 
  var params = {
    'contentType' : 'application/json',
    'method' : 'post',
    'payload' : JSON.stringify(data)
  };
 //var url = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + A3RT_KEY;
  var url = 'https://api.a3rt.recruit-tech.co.jp/proofreading/v2/typo?key=' + A3RT_KEY;
  return UrlFetchApp.fetch(url, params);
}
  
function getSensitive(body){ 
  var sensitive = new Array();
  var content = body;
  var response = analyzeEnti(content);
  var json = JSON.parse(response.getContentText());
  
 return (JSON.stringify(json.sentences)).match(re);
}

  
for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];  
      var subject = thread.getFirstMessageSubject();   

      if (!subject.match(regBiz)) 
        continue;   
      // スレッド内のメッセージを取得する   
        var messages = thread.getMessages();    
        var msg = messages[messages.length - 1];   
        var body = msg.getPlainBody();
        body.match(regex);
        var score = getEntities(body);
      
      // 未読のメッセージのみ処理する    
        if (!msg.isUnread()) 
          continue;    
          msg.markRead(); // 既読にする    
         // ネットから情報を取得する   
         try {      // JSONデータを受信    
//           var text = UrlFetchApp.fetch(apiURI).getContentText();     
//           var obj = JSON.parse(text);     
           // 値を取り出す      
           var head = msg.getFrom() +"さん　\n"+"日報お疲れ様です"　+"今日の感情スコアは"+score +"です"
           var bottom = "\n\n以上です、宜しくお願い致します。"
           // メールに返信      
           msg.reply(head + bottom,{cc:''});   
           Logger.log(score);      
           cnt++;    
         } 
 catch (e) {     
   Logger.log(e.message);   
 } 
}  Logger.log("Check=" + cnt);
                          
  
}
