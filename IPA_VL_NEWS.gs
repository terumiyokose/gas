  
function myFunction() {
  //毎日8時50分頃に実行する
 var response = UrlFetchApp.fetch("https://www.ipa.go.jp/security/rss/alert.rdf");
 var content = response.getContentText();
 //var spreadsheet = SpreadsheetApp.openById(UserProperties.getProperty('sheetID')); APIサポート終了
 var spreadsheet =  SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("key"));
 var sheet = spreadsheet.getSheetByName('IPA情報セキュリティ');
 var today =new Date();
 

  // スプレッドシートから前回送信日時を取得する
  var columnBVals = sheet.getRange('B:B').getValues(); 
  var LastRow = columnBVals.filter(String).length; 
  Logger.log(LastRow)
  var beforeday = sheet.getRange('B'+LastRow).getValue();
  
  //スクレイピングする
  //XMLパース(ライブラリを使用)
   var doc   = XmlService.parse(content),
       xml   = doc.getRootElement(),
       title = parser.getElementsByTagName(xml, 'title');
       link = parser.getElementsByTagName(xml, 'link');
       date = parser.getElementsByTagName(xml, 'date');
       var news = [];
       var links =[];
         
       var count =0;
       for (var i=1; i<=10; i++) {       
       //ニュースの発表日取得
         year = date[i].getValue().substring(0,4);
         month =  date[i].getValue().substring(5, 7);
         day = date[i].getValue().substring(8, 10);
         newday = new Date(year,month-1,day) ;
        
   if(newday >= beforeday){
     sendday = newday;
     news.push("No."+(count+1)+" ■"+title[i].getValue()+"\n");
     links.push(link[i].getValue()+"\n");
     count++;
     
    
    }
    }
 　//todayの内容があればメール送信 
 　 var mailTitle = "【自動送信】IPAセキュリティセンター：重要なセキュリティ情報";
  　var mailBody = "";
  
  
  if(news.length>0){
    
    mailBody += "各位\n\n";
    mailBody += "お疲れさまです。\n\n";
    mailBody += "IPAより重要なセキュリティ情報が発表されましたので、\nお知らせいたします。\n";
    mailBody += "\n以下のリンクより、ご確認お願いします。\n\n";
    mailBody += trim(news.toString());
    mailBody += trim(links.toString())+"\n\n";
     mailBody += "以上です、宜しくお願いいたします。";
    
  // 署名
   mailBody += "\n\n";
   mailBody += "--\n";
     
   //スプレッドシートに送信する時間・ニュース・メール本文を転記※
    sheet.getRange("B"+(LastRow+1)).setValue(today) ;
    sheet.getRange("C"+(LastRow+1)).setValue(news) ;
    sheet.getRange("D"+(LastRow+1)).setValue(mailBody) ;
  //　Logger.log(mailBody)
 
　　　//送信する
    var to = "pball@primebrains.co.jp";
　  MailApp.sendEmail(to,mailTitle,mailBody)
   
   Logger.log(mailBody)
   
  }
  // trim関数を定義する
function trim(target){
  if (target == null || target == undefined){
    return "";
  }
  return target.replace(",", "");
}
}
  

             
   
        
        

