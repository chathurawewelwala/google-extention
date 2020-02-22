

var jscript=document.createElement('SCRIPT');
var style=document.createElement('style');
style.innerHTML='.makefull{width: 100% !important;height: 100% !important;margin: auto !important;display: block !important;}';
jscript.id="jscript";
jscript.src = chrome.extension.getURL('jquery-3.2.1.min.js');
document.head.append(jscript,style);
window.addEventListener("message", function(event) { 
    if (event.source != window){ 
          return;
    }   
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
         var url_array = event.data.urlArray;
         var icon_array = event.data.iconArray;
         var idarr = event.data.id;
         var tiparr = event.data.tip;
         chrome.storage.local.set({'str_array':url_array,'icon_url':icon_array,'tiparr':tiparr,'idarr':idarr},function(){
         console.log('data saved');
         chrome.runtime.sendMessage('updatealltabs');
          });
        }   
    }); 

 chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.get=='getElement'){
      sendData();
     }
}); 
$(document).ready(function(){
setAllUp();
sendData();
setTimeout(sendData,1000);
});
function setAllUp(){

  var container1= document.createElement('DIV');
  var container2= document.createElement('DIV');
  var container3= document.createElement('DIV');
  var container4= document.createElement('DIV');
  var container5= document.createElement('DIV');
  var container6= document.createElement('DIV');
  container1.id="container1";
  container2.id="container2";//main window
  container3.id="container3";//self updating window
  container4.id="container4";//update button
  container5.id="container5";//tag button
  container6.id="container6";//delete button
  container1.innerHTML='<img id=button1 alt="add" src="'+chrome.extension.getURL('button1.png')+'">';
  container4.innerHTML='<img class="makefull" id=update draggable=false ondrop="drop1(event)" ondragover="allowDrop1(event)" ondragleave="dragleave5(event)" alt="update" src="'+chrome.extension.getURL('update1.png')+'">';
  container5.innerHTML='<img class="makefull" id=tag draggable=false ondrop="drop3(event)" ondragover="allowDrop3(event)" ondragleave="dragleave3(event)" alt="tag" src="'+chrome.extension.getURL('tag1.png')+'">';
  container6.innerHTML='<img class="makefull" id=delete draggable=false ondrop="drop4(event)" ondragover="allowDrop4(event)" ondragleave="dragleave4(event)" alt="delete" onclick="deleteByOne()" src="'+chrome.extension.getURL('delete1.png')+'">';
  document.body.append(container1);
  container2.append(container3,container4,container5,container6);
  document.body.append(container2);
  pagescript= document.createElement('SCRIPT');
  eventscript= document.createElement('SCRIPT');
  pagescript.id="pagescript";
  eventscript.id="eventscript";
  pagescript.src=chrome.extension.getURL('pagescript.js');
  eventscript.src=chrome.extension.getURL('eventscript.js');
  document.body.append(pagescript,eventscript);


  $('#button1').on({
    mouseenter:function(){
      this.src=chrome.extension.getURL('button2.png');
    },
    mouseleave:function(){
     this.src=chrome.extension.getURL('button1.png');
    },
    click:function(){
      $('#container2').css("width","120px");
    }
  });
  $('#container2').on({
    mouseleave:function(){
      this.style.width="0px";
    }
  });
   $('#delete').on({
    mouseenter:function(){
      this.src=chrome.extension.getURL('delete2.png');
    },
    mouseleave:function(){
     this.src=chrome.extension.getURL('delete1.png');
      $('#container6').attr('style','border-style: outset;');
    },
    mousedown:function(){
      $('#container6').attr('style','border-style: inset;');
    },
    mouseup:function(){
      $('#container6').attr('style','border-style: outset;');
    }
  });
}

function sendData(){
   chrome.storage.local.get(['str_array','icon_url','tiparr','idarr'],
    function(data){ 
      var url_array = data.str_array;
      var icon_array = data.icon_url;
      var tiparr = data.tiparr;
      var idarr = data.idarr;
    
            if(data.str_array==undefined && data.icon_url==undefined){
                    url_array=[];
                    icon_array=[];                        
                    console.log('no urls'); 
            }
            if(data.tiparr==undefined && data.idarr==undefined){
                    tiparr=[];
                    idarr=[];
            }

      var data = { type: "FROM_CONTENT", urlArray:url_array, iconArray:icon_array, tip:tiparr, id:idarr, rootsrc:chrome.extension.getURL('imgicon')};
            window.postMessage(data, "*");    

      });  
   }

