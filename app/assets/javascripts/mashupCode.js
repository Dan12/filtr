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
  $(".mashup-preview-canvas, .mashup-layers-canvas").css({"width":((containerWidth-30)/3)+"px","height":((containerWidth-30)/3)+"px"});
  $(".mashup-preview-canvas, .mashup-layers-canvas").attr({"width":((containerWidth-30)/3)+"px","height":((containerWidth-30)/3)+"px"});
  $(".mashup-layers-canvas").css("width",(((containerWidth-10)*2/3))+"px");
  $(".mashup-layers-canvas").attr("width",(((containerWidth-10)*2/3))+"px");
  $(".mashup-layers").css("left",((containerWidth/3)+containerLeft+5)+"px");
  $(".mashup-library").css("left",((containerWidth*2/3)+containerLeft+10)+"px");
  $(".mashup-layers, .mashup-library").css("top","0");
  $(".mashup-layers, .mashup-library").css("top",($(".mashup-preview").offset().top)+"px");

  setupMashup(containerWidth);
}

function setupMashup(containerWidth){
  previewCanvas = document.getElementById("mashup-preview-canvas");
  previewContext = previewCanvas.getContext("2d");
  previewImage = new Image();
  previewImage.src = "/assets/img1.jpeg";
  previewImage.onload = function(){
    previewContext.drawImage(previewImage,0,0,((containerWidth-30)/3),((containerWidth-30)/3));
  }
  
  layersCanvas = document.getElementById("mashup-layers-canvas");
  context = layersCanvas.getContext("2d");
  width = ((containerWidth-30)/3);
  scrolly = 0;
  padding = 15;
  context.fillStyle="black";
  context.strokeStyle="black";
  context.lineWidth=1;
  context.translate(-1,-1);
  $(".mashup-layers-canvas").mouseenter(function(){
    disableScroll();
  });
  $(".mashup-layers-canvas").mouseleave(function(){
    enableScroll();
  });
  layersCanvas.addEventListener('mousewheel',function(event){
    scrolly+=event.deltaY;
    if(scrolly > 0)
      scrolly = 0;
    drawObjects();
    return false; 
  }, false);
  drawObjects();
}

function drawObjects(){
  context.clearRect(0,0,layersCanvas.width,layersCanvas.width);
  context.strokeRect(0,scrolly,width,40);
  context.strokeRect(0,scrolly+40,width,40);
  context.strokeRect(width+padding,scrolly,width,40);
  context.strokeRect(width+padding,scrolly+40,width,40);
}