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
  else if($(".show-filter-container").html() !== undefined){
    showFilterPageSetup();
  }
  
  generalReformat();
  $(window).resize(function(){
    generalReformat();
  });
  
  $(".section-item-views").each(function(){
    if(parseInt($(this).text()) == 1)
      $(this).text("1 view");
  })
  
  $(".menu-image").click(function(){
//     $(".user-nav-container").toggle(200, function(){
//        $(window).trigger('resize');
//     });
  });
});