function mashupPageSetup(){
  mashupPageReformat();
  
  $(window).resize(function(){
    if($(".mashup-header").html() !== undefined){
      mashupPageReformat();
    }
  });
}

function mashupPageReformat(){
  var containerWidth = $(".section-content").width()-40;
  var containerLeft = $(".section-content").offset().left;
  $(".mashup-preview, .mashup-layers, .mashup-library").css("width",((containerWidth-30)/3)+"px");
  $(".mashup-layers").css("left",((containerWidth/3)+containerLeft+5)+"px");
  $(".mashup-library").css("left",((containerWidth*2/3)+containerLeft+10)+"px");
  $(".mashup-layers, .mashup-library").css("top","0");
  $(".mashup-layers, .mashup-library").css("top",($(".mashup-preview").offset().top)+"px");
}