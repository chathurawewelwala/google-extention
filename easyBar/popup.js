$(document).ready(function () {
	$('#plus').on({
     mousedown:function(){
      $('#plus').css("border-style","inset");
     },
     mouseup:function(){
     $('#plus').css("border-style","outset");
     chrome.tabs.executeScript(null,{file:"plus.js"});
     setTimeout((function(){
        window.close();
     }),500);
     }
	});
});