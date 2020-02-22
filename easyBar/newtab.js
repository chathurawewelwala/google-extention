
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.get=='getElement'){
      addElement();
     }
});

setTimeout(addElement,1);

function addElement(){

$('#container2').css('width','120px');

 chrome.storage.local.get(['str_array','icon_url','tiparr','idarr'],
    function(data){ 
       url_array = data.str_array;
       icon_array = data.icon_url;
       tiparr = data.tiparr;
       idarr = data.idarr;
       icon_array2=['www.amazon','www.youtube','www.ebay','www.facebook','gomovies',
                    'twitter','mail.google','mg.mail.yahoo','www.baidu','en.wikipedia','www.yahoo',
                    'www.qq','www.reddit','world.taobao','www.tmall','vk','www.instagram','www.linkedin',
                    'www.360','www.yandex','www.ntd','www.pornhub','wordpress','www.livejasmin',
                    'www.aliexpress','www.twitch','mywatchseries','www.pinterest'];
       sufixxarr=[
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

    
            if(data.str_array==undefined && data.icon_url==undefined){
                    url_array=[];
                    icon_array=[];                        
                    console.log('no urls'); 
            }
            if(data.tiparr==undefined && data.idarr==undefined){
                    tiparr=[];
                    idarr=[];
            }    
        document.getElementById('container2').innerHTML=" ";
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
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=false class=makefull alt=NoImage id=url"+i+" "+"src="+chrome.extension.getURL('imgicon/noicon.png')+"></a></div>";
            }else{  
               if(icon!=='no match'){
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=false class=makefull alt=NoImage id=url"+i+" "+"src="+chrome.extension.getURL('imgicon')+"/"+icon+".png></a></div>";
              }else if(icon=='no match'){
                  text+="<div class=element><span class=tooltiptext id="+url_array[i]+">"+tooltiptext+"</span><a target='_parent' href="+url_array[i]+"><img draggable=false class=makefull alt=NoImage id=url"+i+" "+"src="+icon_array[i]+"></a></div>";
              }
            }
         }  
    
     document.getElementById('container2').innerHTML=text;
     for(var i=0;i<tiparr.length;i++){
        document.getElementById(idarr[i]).innerHTML=tiparr[i];  
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
  }); 
}
 