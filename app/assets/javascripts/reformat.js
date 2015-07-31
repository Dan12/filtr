$(window).bind('page:change', function() {
  
  if($(".home-header").html() !== undefined){
    homePageFormat();
    $(window).resize(function(){
      homePageFormat();
    });
  }
  else if($(".creation-center-header").html() !== undefined){
    creationPageSetup();
  }
  
  generalReformat();
  $(window).resize(function(){
    generalReformat();
  });
});