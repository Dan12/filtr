$(window).bind('page:change', function() {
  
  if($(".home-header").html() !== undefined){
    homePageFormat();
    $(window).resize(function(){
      if($(".home-header").html() !== undefined){
        homePageFormat();
      }
    });
  }
  else if($(".creation-center-header").html() !== undefined){
    creationPageSetup();
  }
  else if($(".mashup-header").html() !== undefined){
    mashupPageSetup();
  }
  
  generalReformat();
  $(window).resize(function(){
    generalReformat();
  });
});