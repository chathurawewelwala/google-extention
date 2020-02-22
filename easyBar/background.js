
var url_array=[];
var icon_array=[];
$(document).ready(function () {
     //chrome.storage.local.clear(function(){
      // alert('all removed');
    // });
  chrome.storage.local.get(['str_array','icon_url'],function(data){
    url_array=data.str_array;
    icon_array=data.icon_url;
    if(url_array==undefined || icon_array==undefined ){
       url_array=[];
       icon_array=[];
       console.log('No-urls');
    }
  });
});

chrome.runtime.onMessage.addListener(function (message,sender,response) {
  if(message=='updatealltabs'){
   chrome.tabs.query({}, function(tabs) {
          for(var i=0;i<tabs.length;i++){
            chrome.tabs.sendMessage(tabs[i].id, {get: "getElement"});
          }
      });
     location.reload();
      return; 
  }
  if(message==='clear all'){
     chrome.storage.local.clear(function(){
     alert('all urls removed');
     chrome.tabs.query({}, function(tabs) {
          for(var i=0;i<tabs.length;i++){
            chrome.tabs.sendMessage(tabs[i].id, {get: "getElement"});
            }
         });
     location.reload();
    });
 }else{
  var str = message.split(" ");
  var pageurl=str[0];
  var iconArr=str[1].split(",");
  getIconUrl(iconArr,pageurl);
  }
});

function getIconUrl(array,pageUrl){
       var sizearr=[];
       var len=array.length
       for(var i=0;i<len;i++){
        var img = document.createElement('img');
        img.id=i;
        img.src=array[i];
        document.body.append(img);
        
       }
       setTimeout((function(){
         for(var i=0;i<len;i++){
         sizearr.push(document.getElementById(i).width);
         }
         sizearr.sort(function(a,b){return a-b});
         for(var i=0;i<len;i++){

          if(sizearr[len-1]==document.getElementById(i).width){
            if(document.getElementById(i).width!==20){
              var icon_url=document.getElementById(i).src;
              var str=icon_url; 
            }else{
              var str="no-image";
            }
           document.body.innerHTML="";
           var check = checkForRepeat(url_array,pageUrl);
           if(check==undefined){
            if(confirm('Add this page to easyBar?')==true){
                        url_array.push(pageUrl);
                        icon_array.push(str);
                        chrome.storage.local.set({'str_array':url_array,'icon_url':icon_array},function(){
                        chrome.tabs.query({}, function(tabs) {
                        for(var i=0;i<tabs.length;i++){
                                  chrome.tabs.sendMessage(tabs[i].id, {get: "getElement"});
                        }
                     });
                  location.reload();
                });
               }
             }else{
               icon_array[check]=str;
               chrome.storage.local.set({'icon_url':icon_array},function(){
                alert('page alredy exists on the easyBar!!!');
               });
             }
             break;
           }
       }   
    }),1000);
  }

function checkForRepeat(array,val){
          var arrlen = array.length;
          if(arrlen==undefined){
            url_array=[];
          }else{
          var url = val;
          var i = 0;
          for (i; i<arrlen; i++) {
                if(url===array[i]){
                        return i;
                        break;
                }
          }

      }
 }

 