function showFilterPageSetup(){
  var code = $(".data").data("code");
  var inputs = $(".data").data("matrix").split(",");
  
  var editor = CodeMirror(document.getElementsByClassName("code-enter")[0], {
    lineNumbers: true,
    value: code,
    mode:  "javascript",
  });
  
  $(".code-enter").append('<div class="button-1 generate-code">Generate</div>');
  
  var dim = inputs[0];
  for(var i = 0; i < dim; i++){
    $(".filter-inputs").append('<div class="filter-input-row"></div>');
    for(var j = 0; j < dim; j++){
      var value = inputs[i*dim+j+1];
      $(".filter-inputs div:last").append('<input class="filter-input-col filter-input-'+(i*dim+j)+'" size="6" value="'+value+'" onClick="this.select();">');
    }
  }
  
  $(".filter-input-col").blur(function(){
    updateImageShow(dim);
  });
  
  canvElem = document.getElementById("preview-canvas");
  canvas = canvElem.getContext("2d");
  image = new Image();
  image.src = "/assets/img"+randNum(1,10)+".jpeg";
  image.onload = function(){
    updateImageShow(dim);
  }
  
  $(".filter-preview-refresh").click(function(){
    image.src = "/assets/img"+randNum(1,10)+".jpeg";
    image.onload = function(){
      updateImageShow(dim);
    }
  });
  
  $(".toggle-inputs").click(function(){
    $(".filter-inputs").toggle(100,function(){$(window).resize();});
    $('.toggle-inputs').text($('.toggle-inputs').text() == "Hide Inputs" ? "Show Inputs" : "Hide Inputs");
  });
  
  $(".generate-code").click(function(){
    var val = editor.getValue();
    $.ajax({
        type: "POST",
        url: "/generate_code",
        data: {code: val},
        success: function(data, textStatus, jqXHR) {
          //console.log(jqXHR);
          dim = generateInputsFromCodeShow(jqXHR.responseJSON.output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
    });
  });
  
  $(".save-filter").click(function(){
    var name = prompt("Name your filter",$(".data").data("name"));
    var dataURL = canvElem.toDataURL();
    var tempImage = new Image();
    tempImage.src = dataURL;
    tempImage.onload = function(){
      document.getElementById("thumb-canvas").getContext("2d").drawImage(tempImage,0,0,50,50);
      $.ajax({
        type: "POST",
        url: "/filter/update/"+($(".data").data("id"))+"",
        data: {name: name, matrix: getShowMatrix(dim), code: editor.getValue(), thumb:document.getElementById("thumb-canvas").toDataURL()},
        success: function(data, textStatus, jqXHR) {
          // console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          //window.location.href = data.url;
          $(".filter-name").text(name);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
      });
    }
  });
  
  $(".copy-filter").click(function(){
    var name = prompt("Name your filter",$(".data").data("name")+"-copy");
    var dataURL = canvElem.toDataURL();
    var tempImage = new Image();
    tempImage.src = dataURL;
    tempImage.onload = function(){
      document.getElementById("thumb-canvas").getContext("2d").drawImage(tempImage,0,0,50,50);
      $.ajax({
        type: "POST",
        url: "/create_filter",
        data: {name: name, matrix: getShowMatrix(dim), code: editor.getValue(), thumb:document.getElementById("thumb-canvas").toDataURL()},
        success: function(data, textStatus, jqXHR) {
          // console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          window.location.href = data.url;
          $(".filter-name").text(name);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
      });
    }
  });
}

function updateImageShow(dim){
  canvas.drawImage(image,0,0,canvElem.width,canvElem.height);
  var temp = canvas.getImageData(0,0,canvElem.width,canvElem.height);
  var weight = [[0,0,0],
                [0,1,0],
                [0,0,0]];
  if($(".filter-input-0").html() !== undefined){
    var inArr = [dim];
    for(var i = 0; i < dim; i++){
      for(var k = 0; k < dim; k++){
        inArr.push(parseFloat($(".filter-input-"+(i*dim+k)+"").val()));
      }
    }
    //console.log(inArr);
    weight = generateWeights(inArr);
  }
  drawImage(canvElem.width,canvElem.height,processImage(temp.data,canvElem.height,canvElem.width,weight,4),canvas);
}

function generateInputsFromCodeShow(output){
  var outArr = output.split("\n");
  var dim = parseInt(outArr[0]);
  $(".filter-dim-input").val(dim);
  if(dim%2 != 0){
    $(".filter-input-row").remove();
    for(var i = 1; i <= dim; i++){
      $(".filter-inputs").append('<div class="filter-input-row"></div>');
      for(var k = 1; k <= dim; k++){
        var value = outArr[(i-1)*dim+k];
        $(".filter-inputs div:last").append('<input class="filter-input-col filter-input-'+((i-1)*dim+(k-1))+'" size="6" value="'+value+'" onClick="this.select();">');
      } 
    }
    $(window).resize();
    updateImageShow(dim);
    $(".filter-input-col").blur(function(){
      updateImageShow(dim);
    });
  }
  return dim;
}

function getShowMatrix(dim){
  var retString = ""+dim+",";
  for(var i = 0; i < dim; i++){
    for(var k = 0; k < dim; k++){
      retString+=$(".filter-input-"+(i*dim+k)+"").val()+",";
    }
  }
  return retString.substring(0,retString.length-1);
}