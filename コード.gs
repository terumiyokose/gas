function InformAru(){
  var mySheet = SpreadsheetApp.getActiveSheet(); //シートを取得
  var myCell = mySheet.getActiveCell(); //アクティブセルを取得
  var ss = SpreadsheetApp.getActiveSpreadsheet(); //スプシ（≠シート）を取得
  var ss_url = ss.getUrl();
  var lastpost =""
  var lastmod = ""
  var date = new Date();
  

  
  if(myCell.getColumn()==8){ //数字の部分には列番号（起票者に変更がかかった時）
    var text       = myCell.getValue()+'さんにより'+myCell.getRow() + '行目に、分類「' + myCell.offset(0, -5).getValue()+'」の「'+myCell.offset(0, -4).getValue()+'」プロジェクトあるあるが追加されました'+ ss_url;
     SpreadsheetApp.getActiveSpreadsheet().getSheetByName("あるある").getRange('A3').setValue(date)
     lastpost = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange('A3').getValue();
     slackPost();
  }
  if(myCell.getColumn()==11){ //数字の部分には列番号（更新者に変更がかかった時）
    var text       =  myCell.getValue()+'さんにより'+myCell.getRow() + '行目の分類「' + myCell.offset(0, -8).getValue()+'」のプロジェクトあるある「'+myCell.offset(0, -7).getValue()+'」が更新されました'+ ss_url;
     SpreadsheetApp.getActiveSpreadsheet().getSheetByName("あるある").getRange('A2').setValue(date)
     lastmod =SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange('A2').getValue();
    slackPost();
  }
  
  function slackPost(){
    var url        = 'https://slack.com/api/chat.postMessage';
    var token      = PropertiesService.getScriptProperties().getProperty('SLACK_API_TOKEN');
    var channel    = '#aruaru';
    var username   = 'あるある追加通知';
    var parse      = 'full';
    var icon_emoji = ':coffee:';
    var method     = 'post'; 
    var payload = {
      'token'      : token,
      'channel'    : channel,
      'text'       : text,
      'username'   : username,
      'parse'      : parse,
      'icon_emoji' : icon_emoji
    }
    var params = {
      'method' : method,
      'payload' : payload
    }
    var response = UrlFetchApp.fetch(url, params);
   
  }


    //一週間更新ない場合
  Utilities.sleep(24 * 60 * 60 * 1000);
  var text ="あるある追加/更新から1週間が経ちました。あるある最終追加は"+lastpost +"あるある最終更新は"+lastmod;
  slackPost();
  
 
  }

 