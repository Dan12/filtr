function homePageFormat(){
  
  var sectionHeader = $(".section-header");
  var refresh = $(".refresh");
  refresh.css("left","0");
  refresh.css("left",((sectionHeader.offset().left+sectionHeader.outerWidth())-(refresh.offset().left+refresh.outerWidth()+14))+"px");
  
  $(".section-content").css("padding","0");
  var items = $(".section-item").length;
  var rightMost = $(".section-item:first-child").offset().left;
  for(var i = 2; i <= items; i++){
    var temp = $(".section-item:nth-child("+i+")").offset().left;
    if(temp > rightMost)
      rightMost = temp;
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

  $(".refresh").css("margin-bottom",(-(($(".section-header").outerHeight()-$(".refresh").outerHeight())/2))+"px");
}