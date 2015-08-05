function generalReformat(){
  
  var headerRight = $(".authactions");
  var headerContainer = $(".header-container");
  headerRight.css("left","0");
  headerRight.css("left",((headerContainer.offset().left+headerContainer.outerWidth())-(headerRight.offset().left+headerRight.outerWidth()+10))+"px");
  if($(".login").html() == undefined){
    $(".menu-image").css({"top":"0"});
    $(".menu-image").css({"top":($(".header").offset().top-$(".menu-image").offset().top+5)+"px"});
    $(".user-nav-container div").css("margin","10px");
    $(".user-nav-container div").css("margin","10px "+((($(".user-nav-container").offset().left+$(".user-nav-container").width())-($(".user-nav-container a:last").offset().left+$(".user-nav-container a:last").width()))/8)+"px");
  }
  
  var navRight = $(".nav-right");
  var nav = $(".nav-container");
  navRight.css("left","0");
  navRight.css("left",((nav.offset().left+nav.outerWidth())-(navRight.offset().left+navRight.outerWidth()+10))+"px");
  
  if($(".show-user-container").html() !== undefined || $(".popular-container").html() !== undefined || $(".edit-information-container").html() !== undefined){
    $(".section-content").css("padding","0");
    var items = $(".section-item").length;
    var rightMost = $(".section-item:first-child").offset().left;
    for(var i = 2; i <= items; i++){
      if($(".section-item:nth-child("+i+")").offset() !== undefined){
        var temp = $(".section-item:nth-child("+i+")").offset().left;
        if(temp > rightMost)
          rightMost = temp;
        else{
          rightMost+=$(".section-item-image").width()+parseInt($(".section-item").css("margin-left"));
          break;
        }
      }
      else{
        rightMost+=$(".section-item-image").width()+parseInt($(".section-item").css("margin-left"));
        break;
      }
    }

    var containerRight = $(".section-content").offset().left+$(".section-content").outerWidth();
    $(".section-content").css("padding","0 "+(Math.floor((containerRight-rightMost-2)/2))+"px");

    var contentPadding = parseInt($(".section-item-content").css("padding"));
    var contentImgDim = parseInt($(".section-item-image").css("width"));
    $(".section-item-content").css({"width":(contentImgDim-contentPadding*2)+"px","height":(contentImgDim-contentPadding*2)+"px","margin-top":(-contentImgDim-4)+"px"});

    $(".section-item-content span").css("max-width",(contentImgDim-contentPadding*2)+"px");
  }
  
  if($(".signup-container").html() !== undefined || $(".login-container").html() !== undefined || $(".edit-information-container").html() !== undefined){
    $(".section-content form").css("margin","0");
    $(".section-content form").css("margin","0 "+Math.floor((($(".section-container").width()-$(".section-content form").width())/2-1))+"px");
    if($(".edit-information-container").html() !== undefined){
      $(".section-content-edit-mod form").css("margin","0");
      $(".section-content-edit-mod form").css("margin","0 "+Math.floor((($(".section-container").width()-$(".section-content-edit-mod form").width())/2-1))+"px");
    }
  }
  
  if($(".create-filter-container").html() !== undefined || $(".show-filter-container").html() !== undefined){
    $(".CodeMirror").css("height",$(".CodeMirror").width()+"px");
    $(".preview-container").css({"top":"0","left":"0"});
    $(".preview-canvas").css({"height":$(".CodeMirror").width()+"px"});
    //$(".preview-canvas").attr({"height":$(".CodeMirror").width()+"px","width":$(".CodeMirror").width()+"px"});
    $(".preview-container").css({"top":($(".code-enter").offset().top-$(".preview-container").offset().top)+"px","left":($(".code-enter").width()-$(".preview-container").width()+20)+"px"});
    
    $(".filter-preview-refresh").css({"margin-top":"0","top":"0"})
    $(".filter-preview-refresh").css("margin-top",($(".code-enter h3").offset().top-$(".preview-container h3").offset().top)+"px");
    $(".filter-preview-refresh").css("top",(16)+"px");
  }
}