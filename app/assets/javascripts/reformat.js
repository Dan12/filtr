$(window).bind('page:change', function() {
  
  if($(".home-header").html() !== undefined){
    homePageFormat();
    $(window).resize(function(){
      homePageFormat();
      $(document).mousemove(function(e){
        var create = $(".create")[0].getBoundingClientRect();
        if(e.pageY >= create.top && e.pageY <= create.bottom && e.pageX >= create.left && e.pageX <= create.right){
          $(".create").css("background-color","rgb(150,150,150)");
          $('html,body').css('cursor','pointer');
        }
        else{
          $(".create").css("background-color","rgb(110,110,110)");
          $('html,body').css('cursor','auto');
        }
      });
    });
  }
});