$(document).on("click",".gg-element",function(){var g=$(this);$(this).prev().find("img"),$(this).next().find("img");$("#gg-screen").show();var e=$(".gg-element").length-1,i=$(".gg-element").index(g);function t(){return e>1?0==i?'<div class="gg-close gg-bt">&times</div><div class="gg-nxt gg-bt">&rarr;</div>':i==e?'<div class="gg-close gg-bt">&times</div><div class="gg-prev gg-bt">&larr;</div>':'<div class="gg-close gg-bt">&times</div><div class="gg-nxt gg-bt">&rarr;</div><div class="gg-prev gg-bt">&larr;</div>':'<div class="gg-close gg-bt">&times</div>'}t();var s=t();$("#gg-screen").html('<div class="gg-image"></div>'+s),$(".gg-image").html('<img src="'+$("img",this).attr("src")+'">'),$("body").css("overflow","hidden"),$(document).on("click",".gg-close",function(){$("#gg-screen").hide(),$("body").css("overflow","auto")}),$("#gg-screen").on("click",function(g){g.target==this&&($("#gg-screen").hide(),$("body").css("overflow","auto"))}),$(document).on("click",".gg-prev",function(){g=g.prev();var e='<img src="'+g.find("img").attr("src")+'">';$(".gg-image").html(e),i=$(".gg-element").index(g),t(),s=t(),$("#gg-screen").html('<div class="gg-image">'+e+"</div>"+s)}),$(document).on("click",".gg-nxt",function(){g=g.next();var e='<img src="'+g.find("img").attr("src")+'">';$(".gg-image").html(e),i=$(".gg-element").index(g),t(),s=t(),$("#gg-screen").html('<div class="gg-image">'+e+"</div>"+s)}),$(document).on("keydown",function(c){if(37==c.keyCode&&i>0){g=g.prev();var n='<img src="'+g.find("img").attr("src")+'">';$(".gg-image").html(n),i=$(".gg-element").index(g),t(),s=t(),$("#gg-screen").html('<div class="gg-image">'+n+"</div>"+s)}else if(39==c.keyCode&&i<e){g=g.next();var r='<img src="'+g.find("img").attr("src")+'">';$(".gg-image").html(r),i=$(".gg-element").index(g),t(),s=t(),$("#gg-screen").html('<div class="gg-image">'+r+"</div>"+s)}})});