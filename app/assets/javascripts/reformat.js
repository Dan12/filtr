$(window).bind('page:change', function() {
  
  if($(".popular-container").html() !== undefined){
    homePageFormat();
    $(window).resize(function(){
      if($(".popular-container").html() !== undefined){
        homePageFormat();
      }
    });
  }
  else if($(".create-filter-container").html() !== undefined){
    creationPageSetup();
  }
  else if($(".mashup-filter-container").html() !== undefined){
    mashupPageSetup();
  }
  else if($(".edit-information-container").html() !== undefined){
    editPageSetup();
  }
  
  generalReformat();
  $(window).resize(function(){
    generalReformat();
  });
  
  $(".menu-image").click(function(){
//     $(".user-nav-container").toggle(200, function(){
//        $(window).trigger('resize');
//     });
  });
});