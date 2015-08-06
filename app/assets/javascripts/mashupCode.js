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
  $(".mashup-preview-refresh").css({"top":($(".mashup-preview h3").offset().top-10)+"px","left":((containerWidth-30)/3)+"px"})
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
  userLibrary = $(".data").data("library");
  console.log(userLibrary);
  
  previewCanvas = document.getElementById("mashup-preview-canvas");
  previewContext = previewCanvas.getContext("2d");
  previewImage = new Image();
  previewImage.src = "/assets/img"+randNum(1,10)+".jpeg";
  previewImage.onload = function(){
    previewContext.drawImage(previewImage,0,0,width,width);
    drawImageLayers();
  }
  
  $(".mashup-preview-refresh").click(function(){
    previewImage.src = "/assets/img"+randNum(1,10)+".jpeg";
    previewImage.onload = function(){
      drawImageLayers();
    }
  });
  
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
  
  imagesLoaded = 0;
  
  layerarray = [];
  for(var i = 0; i < 1; i++){
    layerarray.push({id:-1,name:"",libIndex:-1,x:0,y:boxHeight*i+1,width:boxHeight-2,height:boxHeight-2});
  }
  libraryarray = [];
  for(var i = 0; i < userLibrary.length; i++){
    var tempImg = new Image();
    tempImg.src=userLibrary[i].thumbnail;
    tempImg.onload = function(){
      checkImagesLoaded();
    }
    libraryarray.push({id:userLibrary[i].id,name:userLibrary[i].name,libIndex:i,x:width+padding+1,y:boxHeight*i+1,width:boxHeight-2,height:boxHeight-2});
  }
  
  if($(".data").data("mashup") !== undefined)
    setupShowMashupPage();
  
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
  
  $(".save-mashup").click(function(){
    var name = "";
    if(mashupShowName !== undefined)
      name = prompt("Name your mashup",mashupShowName+"-copy");
    else
      name = prompt("Name your mashup");
    var dataURL = previewCanvas.toDataURL();
    var tempImage = new Image();
    tempImage.src = dataURL;
    tempImage.onload = function(){
      document.getElementById("thumb-canvas").getContext("2d").drawImage(tempImage,0,0,50,50);
      $.ajax({
        type: "POST",
        url: "/create_mashup",
        data: {name: name, filters: getFilterListCreate(), thumb:document.getElementById("thumb-canvas").toDataURL()},
        success: function(data, textStatus, jqXHR) {
          // console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          window.location.href = data.url;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
      });
    }
  });
  
  setupClicks();
  
  drawObjects();
}

function setupShowMashupPage(){
  //console.log($(".data").data("mashup"));
  //console.log($(".data").data("filters"));
  var mashupFilters = $(".data").data("mashup").filters.split(",");
  var temp = removeDuplicates(mashupFilters,libraryarray);
  for(var i = 0; i < temp.length; i++){
    var obj = searchForObjectById($(".data").data("filters"),parseInt(temp[i]));
    var tempImg = new Image();
    tempImg.src=obj.thumbnail;
    tempImg.onload = function(){
      checkImagesLoaded();
    }
    libraryarray.push({id:obj.id,name:obj.name,libIndex:userLibrary.length,x:width+padding+1,y:boxHeight*libraryarray.length+1,width:boxHeight-2,height:boxHeight-2});
    userLibrary.push({id:obj.id,thumbnail:obj.thumbnail,matrix:obj.matrix})
  }
  for(var i = 0; i < mashupFilters.length; i++){
    var obj = searchForObjectById($(".data").data("filters"),parseInt(mashupFilters[i]));
    layerarray.splice(i,0,{id:obj.id,name:obj.name,libIndex:findLibId(obj.id,userLibrary),x:0,y:boxHeight*i+1,width:boxHeight-2,height:boxHeight-2});
  }
  layerarray[layerarray.length-1].y+=boxHeight*mashupFilters.length;
  
  mashupShowName = $(".data").data("mashup").name;
  
  $(".update-mashup").click(function(){
    var name = prompt("Name your mashup",mashupShowName);
    var dataURL = previewCanvas.toDataURL();
    var tempImage = new Image();
    tempImage.src = dataURL;
    tempImage.onload = function(){
      document.getElementById("thumb-canvas").getContext("2d").drawImage(tempImage,0,0,50,50);
      $.ajax({
        type: "POST",
        url: "/mashup/update/"+$(".data").data("mashup").id+"",
        data: {name:name,filters: getFilterListCreate(), thumb:document.getElementById("thumb-canvas").toDataURL()},
        success: function(data, textStatus, jqXHR) {
          // console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          //window.location.href = data.url;
          $(".mashup-name").text(name);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
      });
    }
  });
}

function removeDuplicates(inarr,libarr){
  var ret = [];
  $.each(inarr, function(i, el){
      if($.inArray(el, ret) === -1) ret.push(el);
  });
  for(var i = 0; i < ret.length; i++){
    for(var j = 0; j < libarr.length; j++){
      if(ret[i] == libarr[j].id){
        ret.splice(i,1);
        i--;
      }
    }
  }
  return ret;
}

function findLibId(id,lib){
  var ret = -1;
  for(var i = 0; i <lib.length; i++){
    if(lib[i].id == id){
      ret = i;
      break;
    }
  }
  return ret;
}

function searchForObjectById(arr,val){
  var ret = -1;
  for(var i = 0; i < arr.length; i++){
    if(arr[i].id == val){
      ret = i;
      break;
    }
  }
  return arr[ret];
}

function getFilterListCreate(){
  var ret = "";
  console.log(layerarray);
  for(var i = 0; i < layerarray.length-1; i++){
    ret+=layerarray[i].id+",";
  }
  console.log(ret);
  return ret.substring(0,ret.length-1);
}

function checkImagesLoaded(){
  imagesLoaded++;
  if(imagesLoaded == libraryarray.length)
    drawObjects();
}

function drawObjects(){
  context.clearRect(0,0,layersCanvas.width+1,layersCanvas.width+1);
  for(var i=0; i<libraryarray.length; i++){
    context.strokeRect(libraryarray[i].x-1,libraryarray[i].y-1+libraryScrollY,width,libraryarray[i].height+2);
    var tempImage = new Image();
    tempImage.src = userLibrary[libraryarray[i].libIndex].thumbnail;
    context.drawImage(tempImage,libraryarray[i].x+width-libraryarray[i].width,libraryarray[i].y+libraryScrollY,libraryarray[i].width,libraryarray[i].height);
    drawFitText(context,libraryarray[i].name,libraryarray[i].x,libraryarray[i].y+libraryScrollY,width-libraryarray[i].width,libraryarray[i].height)
  }
  for(var i=0; i<layerarray.length; i++){
    if(selectIndex == i)
      context.fillRect(layerarray[i].x-1,layerarray[i].y-1+layersScrollY,width,layerarray[i].height+2);
    else
      context.strokeRect(layerarray[i].x-1,layerarray[i].y-1+layersScrollY,width,layerarray[i].height+2);
    if(layerarray[i].id != -1){
      var tempImage = new Image();
      tempImage.src = userLibrary[layerarray[i].libIndex].thumbnail;
      context.drawImage(tempImage,layerarray[i].x+width-layerarray[i].width,layerarray[i].y+layersScrollY,layerarray[i].width,layerarray[i].height);
      drawFitText(context,layerarray[i].name,layerarray[i].x,layerarray[i].y+layersScrollY,width-layerarray[i].width,layerarray[i].height)
    }
  }
  if(dragItem != null){
    var tempImage = new Image();
    tempImage.src = userLibrary[dragItem.libIndex].thumbnail;
    context.strokeRect(dragItem.x-1,dragItem.y-1,width,dragItem.height+2);
    context.drawImage(tempImage,dragItem.x+width-dragItem.w,dragItem.y,dragItem.width,dragItem.height);
    drawFitText(context,dragItem.name,dragItem.x,dragItem.y,width-dragItem.width,dragItem.height)
  }
}

function drawImageLayers(){
  //console.log("starting");
  previewContext.clearRect(0,0,layersCanvas.width+1,layersCanvas.width+1);
  previewContext.drawImage(previewImage,0,0,width,width);
  for(var i = 0; i < layerarray.length; i++){
    if(layerarray[i].id != -1){
      var temp = previewContext.getImageData(0,0,width,width);
      var weight = generateWeights(userLibrary[layerarray[i].libIndex].matrix.split(","));
      console.log(weight);
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
        dragItem = {id:libraryarray[i].id,name:libraryarray[i].name,libIndex:libraryarray[i].libIndex,x:libraryarray[i].x,y:libraryarray[i].y+libraryScrollY,width:libraryarray[i].width,height:libraryarray[i].height};
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
      //console.log("here");
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