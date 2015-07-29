$(window).bind('page:change', function() {
  if($(".home-header").html() != undefined){
    homePageFormat();
    $(window).resize(function(){
      homePageFormat();
    });
    
    $(document).mousemove(function(e){
      var create = $(".create")[0].getBoundingClientRect();
      if(e.pageY >= create.top && e.pageY <= create.bottom && e.pageX >= create.left && e.pageX <= create.right){
        $(".create").css("background-color","rgb(150,150,150)");
        $('html,body').css('cursor','pointer');
      }
      else{
        $(".create").css("background-color","rgb(100,100,100)");
        $('html,body').css('cursor','auto');
      }
    });
  }
});

function homePageFormat(){
  var headerRight = $(".authactions");
  var headerContainer = $(".header-container");
  headerRight.css("left","0");
  headerRight.css("left",((headerContainer.offset().left+headerContainer.outerWidth())-(headerRight.offset().left+headerRight.outerWidth()+10))+"px");
  
  var navRight = $(".nav-right");
  var nav = $(".nav-container");
  navRight.css("left","0");
  navRight.css("left",((nav.offset().left+nav.outerWidth())-(navRight.offset().left+navRight.outerWidth()+10))+"px");
  
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
      rightMost+=180;
      break;
    }
  }
  var containerRight = $(".section-content").offset().left+$(".section-content").outerWidth();
  $(".section-content").css("padding","0 "+(Math.floor((containerRight-rightMost-2)/2))+"px");
  
  var headerHeight = $(".header-container").outerHeight();
  $(".nav-container").css({"padding":headerHeight+"px 8px 4px","margin-top":-headerHeight+"px"});
}