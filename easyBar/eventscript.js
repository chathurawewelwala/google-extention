var url_array;
var imgroot;
window.addEventListener("message", function(event) { 

    if (event.source != window){ 
             return;
    }   
    if (event.data.type && event.data.type == "FROM_PAGE_ADD_EVENT") {
          url_array = event.data.array;
          imgroot=event.data.imgsrc;
         addEventListener();

         function addEventListener(){
              for(var i=0;i<url_array.length;i++){
                     var id= 'url'+i;
                      var obj = document.getElementById(id);
                         obj.onerror = function(obj){
                         document.getElementById(obj.target.id).parentElement.innerHTML="<img draggable=true ondragstart=drag(event) ondrop=drop2(event) ondragover=allowDrop2(event) class=makefull alt=NoImage id="+obj.target.id+" src="+imgroot+"/lock.png>";
                    }
              }
          }
         
         
    }   
});

