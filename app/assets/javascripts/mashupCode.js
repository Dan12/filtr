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
  layersScrollY = 0;
  libraryScrollY = 0;
  padding = 15;
  boxHeight = 60;
  
  layerarray = [];
  libraryarray = [];
  for(var i = 0; i < 10; i++){
    var tempImg = new Image();
    tempImg.src="/assets/temp.png";
    libraryarray.push({name:"name name name name",thumb:tempImg,x:width+padding+1,y:boxHeight*i+1,width:boxHeight-1,height:boxHeight-1});
  }
  
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
    if(event.layerX<width)
      layersScrollY+=event.deltaY;
    else if(event.layerX>width+padding)
      libraryScrollY+=event.deltaY;
    if(layersScrollY > 0)
      layersScrollY = 0;
    if(libraryScrollY > 0)
      libraryScrollY = 0;
    if(libraryScrollY < -libraryarray[libraryarray.length-1].y-libraryarray[libraryarray.length-1].height+width)
      libraryScrollY = -libraryarray[libraryarray.length-1].y-libraryarray[libraryarray.length-1].height+width;
    drawObjects();
    return false; 
  }, false);
  drawObjects();
}

function drawObjects(){
  context.clearRect(0,0,layersCanvas.width+1,layersCanvas.width+1);
  for(var i=0; i<libraryarray.length; i++){
    context.strokeRect(libraryarray[i].x-1,libraryarray[i].y-1+libraryScrollY,width,libraryarray[i].height+1);
    context.drawImage(libraryarray[i].thumb,libraryarray[i].x,libraryarray[i].y+libraryScrollY,libraryarray[i].width,libraryarray[i].height);
  }
//   context.strokeRect(0,layersScrollY,width,boxHeight);
//   context.strokeRect(0,layersScrollY+boxHeight,width,boxHeight);
//   context.strokeRect(width+padding,libraryScrollY,width,boxHeight);
//   context.strokeRect(width+padding,libraryScrollY+boxHeight,width,boxHeight);
}