$(document).ready(function () {
     $('#help').on({
     mousedown:function(){
      $('#help').css("border-style","inset");
     },
     mouseup:function(){
     $('#help').css("border-style","outset");
     $('#table').css("display","none");
     $('#table1').css("display","block");
     }
  });
     $('#reset').click(function(){
          if(confirm('Every page will be lost,are you sure you want to reset')==true){
               chrome.runtime.sendMessage('clear all');
          }
          
     });
});