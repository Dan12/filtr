function signupPageSetup(){
  signupReformat();
  $(window).resize(function(){
    if($(".signup-container").html() !== undefined || $(".login-container").html() !== undefined){
      signupReformat();
    }
  });
}

function signupReformat(){
  $(".section-content form").css("margin","0");
  $(".section-content form").css("margin","0 "+Math.floor((($(".section-container").width()-$(".section-content form").width())/2-1))+"px");
}