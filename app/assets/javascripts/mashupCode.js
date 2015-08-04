function mashupPageSetup(){
  mashupPageReformat();
  setupMashup();
  
  $(window).resize(function(){
    if($(".mashup-filter-container").html() !== undefined){
      mashupPageReformat();
      mashupCanvasReformat();
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
  width = ((containerWidth-30)/3);
}

function mashupCanvasReformat(){
  previewContext.drawImage(previewImage,0,0,width,width);
  for(var i=0; i<libraryarray.length; i++){
    libraryarray[i].x=width+padding;
  }
  context.fillStyle="black";
  context.strokeStyle="black";
  context.font=((boxHeight-6)/2)+"px Arial";
  context.lineWidth=1;
  context.translate(-1,-1);
  drawObjects();
  drawImageLayers();
}

function setupMashup(){
  previewCanvas = document.getElementById("mashup-preview-canvas");
  previewContext = previewCanvas.getContext("2d");
  previewImage = new Image();
  previewImage.src = "/assets/img1.jpeg";
  previewImage.onload = function(){
    previewContext.drawImage(previewImage,0,0,width,width);
  }
  
  layersCanvas = document.getElementById("mashup-layers-canvas");
  context = layersCanvas.getContext("2d");
  layersScrollY = 0;
  libraryScrollY = 0;
  padding = 15;
  boxHeight = 70;
  dragItem = null;
  prevX = -1;
  prevY = -1;
  selectIndex = -1;
  
  layerarray = [];
  for(var i = 0; i < 1; i++){
    var tempImg = new Image();
    tempImg.src = "";
    layerarray.push({id:-1,name:"",thumb:tempImg,x:0,y:boxHeight*i+1,width:boxHeight-2,height:boxHeight-2});
  }
  libraryarray = [];
  for(var i = 0; i < 10; i++){
    var tempImg = new Image();
    tempImg.src="/assets/temp.png";
    libraryarray.push({id:i,name:""+Math.floor(Math.random()*100000000),thumb:tempImg,x:width+padding+1,y:boxHeight*i+1,width:boxHeight-2,height:boxHeight-2});
  }
  
  context.fillStyle="gray";
  context.strokeStyle="black";
  context.font=((boxHeight-6)/2)+"px Arial";
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
      layersScrollY-=event.deltaY;
    else if(event.layerX>width+padding)
      libraryScrollY-=event.deltaY;
    if(layersScrollY > 0)
      layersScrollY = 0;
    if(layersScrollY < -layerarray[layerarray.length-1].y-layerarray[layerarray.length-1].height+width){
      if(layerarray[layerarray.length-1].y+layerarray[layerarray.length-1].height > width)
        layersScrollY = -layerarray[layerarray.length-1].y-layerarray[layerarray.length-1].height+width;
      else
        layersScrollY = 0;
    }
    if(libraryScrollY > 0)
      libraryScrollY = 0;
    if(libraryScrollY < -libraryarray[libraryarray.length-1].y-libraryarray[libraryarray.length-1].height+width){
      if(libraryarray[libraryarray.length-1].y+libraryarray[libraryarray.length-1].height > width)
        libraryScrollY = -libraryarray[libraryarray.length-1].y-libraryarray[libraryarray.length-1].height+width;
      else
        libraryScrollY = 0;
    }
    drawObjects();
    return false; 
  }, false);
  
  setupClicks();
  
  drawObjects();
}

function drawObjects(){
  context.clearRect(0,0,layersCanvas.width+1,layersCanvas.width+1);
  for(var i=0; i<libraryarray.length; i++){
    context.strokeRect(libraryarray[i].x-1,libraryarray[i].y-1+libraryScrollY,width,libraryarray[i].height+2);
    context.drawImage(libraryarray[i].thumb,libraryarray[i].x+width-libraryarray[i].width,libraryarray[i].y+libraryScrollY,libraryarray[i].width,libraryarray[i].height);
    drawFitText(context,libraryarray[i].name,libraryarray[i].x,libraryarray[i].y+libraryScrollY,width-libraryarray[i].width,libraryarray[i].height)
  }
  for(var i=0; i<layerarray.length; i++){
    if(selectIndex == i)
      context.fillRect(layerarray[i].x-1,layerarray[i].y-1+layersScrollY,width,layerarray[i].height+2);
    else
      context.strokeRect(layerarray[i].x-1,layerarray[i].y-1+layersScrollY,width,layerarray[i].height+2);
    if(layerarray[i].id != -1){
      context.drawImage(layerarray[i].thumb,layerarray[i].x+width-layerarray[i].width,layerarray[i].y+layersScrollY,layerarray[i].width,layerarray[i].height);
      drawFitText(context,layerarray[i].name,layerarray[i].x,layerarray[i].y+layersScrollY,width-layerarray[i].width,layerarray[i].height)
    }
  }
  if(dragItem != null){
    context.strokeRect(dragItem.x-1,dragItem.y-1,width,dragItem.height+2);
    context.drawImage(dragItem.thumb,dragItem.x+width-dragItem.w,dragItem.y,dragItem.width,dragItem.height);
    drawFitText(context,dragItem.name,dragItem.x,dragItem.y,width-dragItem.width,dragItem.height)
  }
}

function drawImageLayers(){
  console.log("starting");
  previewContext.clearRect(0,0,layersCanvas.width+1,layersCanvas.width+1);
  previewContext.drawImage(previewImage,0,0,width,width);
  for(var i = 0; i < layerarray.length; i++){
    if(layerarray[i].id != -1){
      var temp = previewContext.getImageData(0,0,width,width);
      var weight = weights[layerarray[i].id].weight
      drawImage(temp.width,temp.height,processImage(temp.data,temp.height,temp.width,weight,4),previewContext);
    }
  }
}

function drawFitText(context,text,x,y,w,h){
  context.fillStyle="black";
  var cutoff = text.length;
  if(context.measureText(text).width>w){
    while(context.measureText(text.substring(0,cutoff)).width > w){
      cutoff--;
    }
  }
  if(cutoff != text.length){
    cutoff--;
    context.fillText(text.substring(0,cutoff)+"-",x,y+h/2-3);
    var cutoff2 = text.length;
    if(context.measureText(text.substring(cutoff,cutoff2)).width>w){
      while(context.measureText(text.substring(cutoff,cutoff2)).width > w){
        cutoff2--;
      }
    }
    context.fillText(text.substring(cutoff,cutoff2),x,y+h-6);
  }
  else
    context.fillText(text,x,y+h*3/4-6);
  context.fillStyle="gray";
}

function setupClicks(){
  $("#mashup-layers-canvas").mousedown(function(e){
    var mouseX = e.pageX - $("#mashup-layers-canvas").offset().left;
    var mouseY = e.pageY - $("#mashup-layers-canvas").offset().top;
    var broken = false;
    selectIndex = -1;
    //console.log(mouseX+","+mouseY+","+$("#mashup-layers-canvas").offset().top)
    for(var i = 0; i < libraryarray.length; i++){
      if(mouseX >= libraryarray[i].x && mouseX <= libraryarray[i].x+width && mouseY >= libraryarray[i].y+libraryScrollY && mouseY <= libraryarray[i].y+libraryarray[i].height+libraryScrollY){
        dragItem = {id:libraryarray[i].id,name:libraryarray[i].name,thumb:libraryarray[i].thumb,x:libraryarray[i].x,y:libraryarray[i].y+libraryScrollY,width:libraryarray[i].width,height:libraryarray[i].height};
        prevX = mouseX;
        prevY = mouseY;
        broken = true;
        break;
      }
    }
    if(!broken){
      for(var i = 0; i < layerarray.length-1; i++){
        if(mouseX >= layerarray[i].x && mouseX <= layerarray[i].x+width && mouseY >= layerarray[i].y+layersScrollY && mouseY <= layerarray[i].y+layerarray[i].height+layersScrollY){
          selectIndex = i;
          break;
        }
      }
    }
    drawObjects();
  });
  
  $("#mashup-layers-canvas").mousemove(function(e){
    if(dragItem != null){
      var mouseX = e.pageX - $("#mashup-layers-canvas").offset().left;
      var mouseY = e.pageY - $("#mashup-layers-canvas").offset().top;
      dragItem.x+=mouseX-prevX;
      dragItem.y+=mouseY-prevY;
      prevX = mouseX;
      prevY = mouseY;
      drawObjects();
    }
  });
  
  $("#mashup-layers-canvas").mouseup(function(e){
    if(dragItem != null){
      console.log("here");
      var mouseX = e.pageX - $("#mashup-layers-canvas").offset().left;
      var mouseY = e.pageY - $("#mashup-layers-canvas").offset().top;
      for(var i = 0; i < layerarray.length; i++){
        if(mouseX >= layerarray[i].x && mouseX <= layerarray[i].x+width && mouseY >= layerarray[i].y+layersScrollY && mouseY <= layerarray[i].y+layerarray[i].height+layersScrollY){
          dragItem.x=layerarray[i].x;
          dragItem.y=layerarray[i].y;
          for(var j = i; j < layerarray.length; j++){
            layerarray[j].y+=boxHeight;
          }
          layerarray.splice(i,0,dragItem);
          drawImageLayers();
          break;
        }
      }
      dragItem = null;
      drawObjects();
    }
  });
  
  $("#mashup-layers-canvas").mouseleave(function(e){
    dragItem = null;
    drawObjects();
  });
  
  $(document).keydown(function (e) {
      if($(".mashup-filter-container").html() !== undefined){
        if(e.which == 68){
          if(selectIndex != -1){
            for(var i = selectIndex+1; i < layerarray.length; i++){
              layerarray[i].y-=boxHeight;
            }
            layerarray.splice(selectIndex,1);
            selectIndex = -1;
            drawObjects();
            drawImageLayers();
          }
        }
      }
  });
}

weights = [{
  id:1,
  weight:[[ 0,-1, 0],
  [-1, 5,-1],
  [ 0,-1, 0]]
},{
  id:2,
  weight:[[1/9,1/9,1/9,1/9],
  [1/9,1/9,1/9,1/9],
  [1/9,1/9,1/9,1/9]]
},{
  id:3,
  weight:[[-1,-1,-1],
  [-1,8,-1],
  [-1,-1,-1]]
}]