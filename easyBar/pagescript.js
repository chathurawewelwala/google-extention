var url_array;
var icon_array;
var tiparr;
var idarr;
var tag_id;
var rootsricon;
var rootsrc;

var icon_array2=['www.amazon','www.youtube','www.ebay','www.facebook','gomovies',
'twitter','mail.google','mg.mail.yahoo','www.baidu','en.wikipedia','www.yahoo',
'www.qq','www.reddit','world.taobao','www.tmall','vk','www.instagram','www.linkedin',
'www.360','www.yandex','www.ntd','www.pornhub','wordpress','www.livejasmin',
'www.aliexpress','www.twitch','mywatchseries','www.pinterest'];

var sufixxarr=[
'ac','ad','ae','aero','af','ag','ai','al','am','an','ao','aq','arpa','as','asia','at','au','aw','ax','az',
'ba','bb','bd','be','bf','bg','bh','bi','biz','bj','bm','bn','bo','br','bs','bt','bv','bw','by','bz',
'ca','cat','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn','co','com','coop','cr','cs','cu','cv','cx','cy','cz',
'dd','de','dj','dk','dm','do','dz',
'ec','edu','ee','eg','eh','er','es','et','eu',
'fi','firm','fj','fk','fm','fo','fr','fx',
'ga','gb','gd','ge','gf','gh','gi','gl','gm','gn','gov','gp','gq','gr','gs','gt','gu','gw','gy',
'hk','hm','hn','hr','ht','hu',
'id','ie','il','im','in','int','io','iq','ir','is','it',
'je','jm','jo','jobs','jp',
'ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz',
'la','lb','lc','li','lk','lr','ls','lt','ltd','lu','lv','ly',
'ma','mc','md','me','mg','mh','mil','mk','ml','mm','mn','mo','mobi','mod','mp','mq','mr','ms','mt','mu','museum','mv','mw','mx','my','mz',
'na','name','nato','nc','ne','net','nf','ng','nhs','ni','nl','no','nom','np','nr','nt','nu','nz',
'om','org','pa','pe','pf','pg','ph','pk','pl','plc','pm','pn','post','pr','pro','ps','pt','pw','py','qa',
're','ro','rs','ru','rw',
'sa','sb','sc','sch','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','store','su','sv','sy','sz',
'tc','td','tel','tf','tg','th','tj','tk','tl','tm','tn','to','tp','tr','travel','tt','tv','tw','tz',
'ua','ug','uk','um','us','uy',
'va','vc','ve','vg','vi','vn','vu',
'web','wf','ws','xxx',
'ye','yt','yu','za','zm','zr','zw'];

window.addEventListener("message", function(event) { 

    if (event.source != window){ 
             return;
    }   
    if (event.data.type && event.data.type == "FROM_CONTENT") {
          url_array = event.data.urlArray;
          icon_array = event.data.iconArray;
          idarr = event.data.id;
          tiparr = event.data.tip;
          rootsricon = event.data.rootsrc;
          rootsrc = rootsricon.substring(0,rootsricon.indexOf('imgicon'));
          console.log('wewelwala.c@gmail.com'); 
          console.log('data received from content');
          addElement();
        }   
    });

function addElement(){
   	     var text = ' ';
         var icon = ' ';
         for(var i=0;i<url_array.length;i++){
         	  var domain_array = url_array[i].split('/');
            var domain = domain_array[0]+"//"+domain_array[2];
            var icon = iconArray(domain_array[2]);
            var tooltiptext=domain_array[2].split('.')[1];
            var check = checkForRepeat(sufixxarr,tooltiptext);
            if(check!==undefined){
            	tooltiptext=domain_array[2].split('.')[0];
              }
            if(icon_array[i]=='no-image'){
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=true ondragstart=drag(event) ondrop=drop2(event) ondragover=allowDrop2(event) class=makefull alt=NoImage id=url"+i+" "+"src="+rootsricon+"/noicon.png></a></div>";
            }else{  
               if(icon!=='no match'){
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=true ondragstart=drag(event) ondrop=drop2(event) ondragover=allowDrop2(event) class=makefull alt=NoImage id=url"+i+" "+"src="+rootsricon+"/"+icon+".png"+"></a></div>";
              }else if(icon=='no match'){
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=true ondragstart=drag(event) ondrop=drop2(event) ondragover=allowDrop2(event) class=makefull alt=NoImage id=url"+i+" "+"src="+icon_array[i]+"></a></div>";
              }
            }
         }  
   	
   	 document.getElementById('container3').innerHTML=text;
     addTooltip();
     var data = {type:'FROM_PAGE_ADD_EVENT',array:url_array,imgsrc:rootsricon};
     window.postMessage(data, "*");  
   }

function iconArray(domain_url){

          var loop=0;   
          var url = domain_url;
          var domain = url.split('.');
          var len = icon_array2.length;
       do{
             for(var i=0;i<len;i++){
             if(url==icon_array2[i]){
              return url;
              break;
           }
         }
           url=addTogether(domain);
           if(url.length==1){
            loop++;
         }
       }
          while(loop!==2);
          return 'no match';
    }  

function addTogether(array){
        var len = array.length;
        if(len === 1){
                return array;
        }else
        array.pop();
        return array.join('.');
    }
    
function dragleave3(ev){

        $('#tag').attr('src',rootsrc+'tag1.png');
    }
function dragleave4(ev){

        $('#delete').attr('src',rootsrc+'delete1.png');
    }
function dragleave5(){
        $('#update').attr('src',rootsrc+'update1.png');
} 
       
function drag(ev){   

        ev.dataTransfer.setData("url_id",ev.target.id);   
    }
function allowDrop1(ev){
        $('#update').attr('src',rootsrc+'update2.png');
        ev.preventDefault();
    }
function allowDrop2(ev){

        ev.preventDefault();
    }
function allowDrop3(ev){

        ev.preventDefault();
        $('#tag').attr('src',rootsrc+'tag2.png');
    }
function allowDrop4(ev){

       $('#delete').attr('src',rootsrc+'delete2.png'); 
        ev.preventDefault();
    }

function drop1(ev){

        ev.preventDefault();
        var pageurl=document.URL
        var str1= pageurl.split('/');
        var pagedomain= str1[2];
        var urlid = ev.dataTransfer.getData("url_id").substring(3);
        var url = url_array[urlid];
        var str2 = url.split('/');
        var urldomain = str2[2];
        console.log(pagedomain+" "+urldomain);
        if(pagedomain==urldomain){
         if(confirm('update   '+url+'   to   '+pageurl)==true){
              url_array[urlid]= pageurl;
              var check = checkForRepeat(idarr,url);
              idarr[check]=pageurl;
              addElement();
              saveToLocal();
          }return;
        }else{
          alert('Domains do not match failed to ubdate page');
        }
        
}

function drop2(ev){

        ev.preventDefault();
        var str1= ev.dataTransfer.getData("url_id");
        var check = str1.indexOf('url');
    if(check==0){
        ev.dataTransfer.setData("url_id",'');
        var id1 = Number(str1.substring(3));
        var str2= ev.target.id;
        var id2 = Number(str2.substring(3));
        var sum;
        var holder1; 
        var holder2;
       if(id1<id2){
            sum= id2+1;
            holder1 = url_array[id1];
            holder2 = icon_array[id1];
            url_array[id1]='emty';
            icon_array[id1]='emty';
            url_array.splice(sum,0,holder1);
            icon_array.splice(sum,0,holder2);

            for(var i=0;i<url_array.length;i++){
                if(url_array[i]!=='emty'){
                        continue;
                }else{
                    url_array.splice(i,1);
                    icon_array.splice(i,1);
                    addElement();
                    saveToLocal();
                  }
            } 
        }else if(id1>id2){
                holder1 = url_array[id1];
                holder2 = icon_array[id1];
                url_array[id1]='emty';
                icon_array[id1]='emty';
                url_array.splice(id2,0,holder1);
                icon_array.splice(id2,0,holder2);

            for(var i=0;i<url_array.length;i++){

                if(url_array[i]!=='emty'){
                        continue;
                }else{
                    url_array.splice(i,1);
                    icon_array.splice(i,1);
                    addElement();
                    saveToLocal();   
                }
            } 
        }
    }else{
         return;
      }
}

function drop3(ev){

      $('#tag').attr('src',rootsrc+'tag1.png');
      ev.preventDefault();
      var url = url_array[ev.dataTransfer.getData("url_id").substring(3)];
      tag_id = url;
      var tagtext = prompt("Please enter an identifier tag, Please keep the charactors under 40",document.getElementById(tag_id).innerHTML);
      getTag(tagtext);
}
function drop4(ev){

      $('#delete').attr('src',rootsrc+'delete1.png');
      ev.preventDefault();
      var str1= ev.dataTransfer.getData("url_id");
      var check = str1.indexOf('url');
      if(check==0){
        ev.dataTransfer.setData("url_id",'');
        var data = str1.substring(3);
        var url = url_array[data];
        var id = Number(data);
             if(confirm('Delete this page : '+ url)==true){
                 url_array.splice(id,1);
                icon_array.splice(id,1);
                  deleteTag(url);
                  addElement();
                  saveToLocal() 
                }return;
        }else{
        return;
      }       
}
  
function saveToLocal(){

	var data = { type: "FROM_PAGE", urlArray :url_array, iconArray :icon_array, tip: tiparr, id: idarr};
          window.postMessage(data, "*");    
  } 

function deleteByOne(){

   var id = url_array[url_array.length-1];
   deleteTag(id);
   url_array.pop();
   icon_array.pop();
   addElement();
   saveToLocal();
}

function getTag(tag){

   if(tag!== null){
    var check =  checkForRepeat(idarr,tag_id);
     if(check==undefined){
        tiparr.push(tag);
        idarr.push(tag_id);
        addTooltip();
        saveToLocal();
   }else{
        tiparr[check]=tag;
        addTooltip();
        saveToLocal();
     }
   }
   return;
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

function addTooltip(){

   for(var i=0;i<tiparr.length;i++){
        document.getElementById(idarr[i]).innerHTML=tiparr[i];  
    }
}

function deleteTag(id){

   var url = id;
   for (var i=0;i<tiparr.length;i++){
        if (url==idarr[i]){
                idarr.splice(i,1);
                tiparr.splice(i,1);
                return;
        }
    }
 }
