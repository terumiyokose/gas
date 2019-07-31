function doGet(){
  // 便宜上
}


function doPost(e) {
  
  Logger.log(e);
  // トークンが不一致なら処理終了
 /* var token = e.parameter.token;
  if (token != "PropertiesService.getScriptProperties().getProperty('OUTGOING')") {
    return;
  }
*/
  // パラメーターを取得
  var text = e.parameter.text;
 
   var ret =  text.slice(4) 
  var value = ret;

  value = value.replace(/\s/g, "+");
  var ss = SpreadsheetApp.openById("");
   var sh = ss.getSheetByName("あるある");
  

  var row = sh.getLastRow() ;
 
  
  for(var i = row; i >= 1; i--){
　　var rng = sh.getRange(i, 4);
　　if(rng.getValue() != ''){
　　　rng.activate();
　　　break;
　　}
　}
 ;
   var next_row =  rng.getRowIndex()+1;
   
  sh.getRange("D" + next_row).setValue(value);
  
  var text = next_row +"行目に"+"あるある「"+ret+"」を追加しました";
  postSlack(text);

}

function postSlack(text){
 var url = 'https://hooks.slack.com/services/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';
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" :'{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}
