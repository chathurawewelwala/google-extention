var pageurl=document.URL

var getFavicon = function() {
    var icon=undefined;
    var favicon =[];
    var linkList = document.getElementsByTagName("link");
   // console.log(linkList);
    for (var i=0; i<linkList.length;i++){
        var link = linkList[i].getAttribute("rel");
       if(link==null){continue;}
        if (link.indexOf('apple')>=0||link== "icon"||link=="shortcut icon"){
            favicon.push(linkList[i].getAttribute("href"));   
        }
    }
    return favicon;      
}

function returnIconArr(arr){
   var len = arr.length;
   var iconArray=[];
   for(var i=0;i<len;i++){
    iconArray.push(returnIcon(arr[i]));
   }
   return iconArray;
}

function returnIcon(iconstring){
    var faviconstr=iconstring;
    var domainArr = pageurl.split('/');
    if(faviconstr.indexOf("https") == 0 || faviconstr.indexOf("http") == 0){
        return faviconstr;
    }
    else if(faviconstr.indexOf("//")==0){
        faviconstr=domainArr[0]+faviconstr;
        return faviconstr;
    }else if(faviconstr.indexOf("/")==0){
        faviconstr=domainArr[0]+"//"+domainArr[2]+faviconstr;
        return faviconstr;
    }else if(faviconstr.indexOf("/")==-1){
        faviconstr=domainArr[0]+"//"+domainArr[2]+"/"+faviconstr;
        return faviconstr;
    }else{
        return faviconstr;
    }
} 


window.onload=(function(){
    var check = returnIconArr(getFavicon());
    if(check[0]!==undefined){
    chrome.runtime.sendMessage(pageurl+" "+check);
    }else{
       var domainArr = pageurl.split('/');
       var icon=domainArr[0]+"//"+domainArr[2]+"/favicon.ico"
    chrome.runtime.sendMessage(pageurl+" "+icon);
    }
})();

