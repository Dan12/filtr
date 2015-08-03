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
  else if($(".signup-container").html() !== undefined || $(".login-container").html() !== undefined){
    signupPageSetup();
  }
  else if($(".show-user-container").html() !== undefined){
    showUserPageSetup();
  }
  
  generalReformat();
  $(window).resize(function(){
    generalReformat();
  });
});