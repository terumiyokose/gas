function myFunction() {
  
  
  /*---------------------------
    GASで誤字検知API叩く
   --------------------------*/
  
  var API_KEY = PropertiesService.getScriptProperties().getProperty("key");
  var A3rt_KEY = PropertiesService.getScriptProperties().getProperty("a3rt");
  //***分析する文章を書く***
  var content = "システムを企画から開発"

  
 //レスポンスはJSONで返る
function analyzeSentiment(content){
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
  
  //var url = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + API_KEY;
  var url = 'https://api.a3rt.recruit-tech.co.jp/proofreading/v2/typo?apikey='+A3rt_KEY+'&sentence='+content;
  return UrlFetchApp.fetch(url, params);
}
 Logger.log(JSON.parse(analyzeSentiment(content)))
}
