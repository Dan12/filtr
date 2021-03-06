function creationPageSetup(){
  var editor = CodeMirror(document.getElementsByClassName("code-enter")[0], {
    lineNumbers: true,
    value: "//blur filter\n//The filter dimension must be an odd number\nvar dim = 3;\n//your first output has to be the dimension of the filter\nconsole.log(dim);\nfor(var i = 0; i < dim; i++){\n\tfor(var j = 0; j < dim; j++){\n\t\t//output the value of the element at\n\t\t//the ith row of the jth column of the filter matrix\n\t\tconsole.log(1);\n\t}\n};",
    mode:  "javascript",
  });
  
  $(".code-enter").append('<div class="button-1 generate-code">Generate</div>');
  
  $(".generate-code").click(function(){
    var val = editor.getValue();
    $.ajax({
        type: "POST",
        url: "/generate_code",
        data: {code: val},
        success: function(data, textStatus, jqXHR) {
          //console.log(jqXHR);
          generateInputsFromCode(jqXHR.responseJSON.output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error=" + errorThrown);
        }
    });
  });
  
  $(".generate-inputs").click(function(){
    var dim = parseInt($(".filter-dim-input").val());
    if(dim%2 != 0){
      $(".filter-input-row").remove();
      for(var i = 1; i <= dim; i++){
        $(".filter-inputs").append('<div class="filter-input-row"></div>');
        for(var k = 1; k <= dim; k++){
          var value = 0;
          if(k == (dim+1)/2 && i == (dim+1)/2)
            value = 1;
          $(".filter-inputs div:last").append('<input class="filter-input-col filter-input-'+((i-1)*dim+(k-1))+'" size="6" value="'+value+'" onClick="this.select();">');
        } 
      }
      $(window).resize();
      updateImage();
      $(".filter-input-col").blur(function(){
        updateImage();
      });
    }
  });
  
  $(".toggle-inputs").click(function(){
    $(".filter-inputs").toggle(100,function(){$(window).resize();});
    $('.toggle-inputs').text($('.toggle-inputs').text() == "Hide Inputs" ? "Show Inputs" : "Hide Inputs");
  });
  
  $(".save-filter").click(function(){
    var name = prompt("Name your filter");
    var dataURL = canvElem.toDataURL();
    var tempImage = new Image();
    tempImage.src = dataURL;
    tempImage.onload = function(){
      document.getElementById("thumb-canvas").getContext("2d").drawImage(tempImage,0,0,50,50);
      $.ajax({
        type: "POST",
        url: "/create_filter",
        data: {name: name, matrix: getCreateMatrix(), code: editor.getValue(), thumb:document.getElementById("thumb-canvas").toDataURL()},
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
  
  canvElem = document.getElementById("preview-canvas");
  canvas = canvElem.getContext("2d");
  image = new Image();
  image.src = $(".data").data("images")[randNum(1,10)-1];
  image.onload = function(){
    updateImage();
  }
  
  $(".filter-preview-refresh").click(function(){
    image.src = $(".data").data("images")[randNum(1,10)-1];
    image.onload = function(){
      updateImage();
    }
  });
}

function getCreateMatrix(){
  var dim = parseInt($(".filter-dim-input").val());
  var retString = ""+dim+",";
  for(var i = 0; i < dim; i++){
    for(var k = 0; k < dim; k++){
      retString+=$(".filter-input-"+(i*dim+k)+"").val()+",";
    }
  }
  return retString.substring(0,retString.length-1);
}

function updateImage(){
  canvas.drawImage(image,0,0,canvElem.width,canvElem.height);
  var temp = canvas.getImageData(0,0,canvElem.width,canvElem.height);
  var weight = [[0,0,0],
                [0,1,0],
                [0,0,0]];
  if($(".filter-input-0").html() !== undefined){
    var dim = parseInt($(".filter-dim-input").val());
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

function generateInputsFromCode(output){
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
    updateImage();
    $(".filter-input-col").blur(function(){
      updateImage();
    });
  }
}