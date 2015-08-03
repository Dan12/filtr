function mashupPageSetup(){
  mashupPageReformat();
  
  $(window).resize(function(){
    if($(".mashup-filter-container").html() !== undefined){
      mashupPageReformat();
    }
  });
}

function mashupPageReformat(){
  var containerWidth = $(".section-content").width()-40;
  var containerLeft = $(".section-content").offset().left;
  $(".mashup-preview-canvas, .mashup-layers-container, .mashup-library-container").css({"width":((containerWidth-30)/3)+"px","height":((containerWidth-30)/3)+"px"});
  $(".mashup-layers").css("left",((containerWidth/3)+containerLeft+5)+"px");
  $(".mashup-library").css("left",((containerWidth*2/3)+containerLeft+10)+"px");
  $(".mashup-layers, .mashup-library").css("top","0");
  $(".mashup-layers, .mashup-library").css("top",($(".mashup-preview").offset().top)+"px");
  
  $(".mashup-library-filter-name,.mashup-layer-filter-name").css("width",($(".mashup-layer-filter").width()-$(".mashup-layer-filter-thumbnail").width())+"px");
  
  $(".mashup-layer-filter img, .mashup-library-filter img").css("left",($(".mashup-layer-filter-name").width())+"px");
  
  for(var i = 1; i<=$(".mashup-layer-filter-thumbnail").length; i++){
    var element = $(".mashup-layer-filter-"+i+" img");
    element.css("top","0");
    element.css("top",($(".mashup-layer-filter-"+i+"").offset().top-element.offset().top)+"px");
  }
  
  for(var i = 1; i<=$(".mashup-library-filter-thumbnail").length; i++){
    var element = $(".mashup-library-filter-"+i+" img");
    element.css("top","0");
    element.css("top",($(".mashup-library-filter-"+i+"").offset().top-element.offset().top)+"px");
  }
}