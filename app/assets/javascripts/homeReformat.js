function homePageFormat(){
  
  var sectionHeader = $(".section-header");
  var refresh = $(".refresh");
  refresh.css("left","0");
  refresh.css("left",((sectionHeader.offset().left+sectionHeader.outerWidth())-(refresh.offset().left+refresh.outerWidth()+14))+"px");

  $(".refresh").css("margin-bottom",(-(($(".section-header").outerHeight()-$(".refresh").outerHeight())/2))+"px");
}