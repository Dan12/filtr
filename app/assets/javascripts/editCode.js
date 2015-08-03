function editPageSetup(){
  editPageReformat();
  $(window).resize(function(){
    if($(".edit-information-container").html() !== undefined){
      editPageReformat();
    }
  });
}

function editPageReformat(){
  $(".section-item-delete").css("margin","0");
  $(".section-item-delete").css({"margin-top":($(".section-item-image").offset().top-$(".section-item-delete").offset().top-10)+"px","margin-left":($(".section-item-image").width()-11)+"px"});
}