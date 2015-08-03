function signupPageSetup(){
  signupReformat();
  $(window).resize(function(){
    if($(".signup-container").html() !== undefined){
      signupReformat();
    }
  });
}

function signupReformat(){
  $(".section-content form").css("margin","0");
  $(".section-content form").css("margin","0 "+(($(".section-container").width()-$(".section-content form").width())/2)+"px");
}