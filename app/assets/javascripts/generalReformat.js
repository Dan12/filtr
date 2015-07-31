function generalReformat(){
  var headerRight = $(".authactions");
  var headerContainer = $(".header-container");
  headerRight.css("left","0");
  headerRight.css("left",((headerContainer.offset().left+headerContainer.outerWidth())-(headerRight.offset().left+headerRight.outerWidth()+10))+"px");
  
  var navRight = $(".nav-right");
  var nav = $(".nav-container");
  navRight.css("left","0");
  navRight.css("left",((nav.offset().left+nav.outerWidth())-(navRight.offset().left+navRight.outerWidth()+10))+"px");
}