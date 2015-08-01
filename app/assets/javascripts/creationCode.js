function creationPageSetup(){
  var editor = CodeMirror(document.getElementsByClassName("code-enter")[0], {
    lineNumbers: true,
    value: "//blur code\nvar dim = 3;\n//your first output has to be the dimension of the filter\nconsole.log(dim);\nfor(var i = 0; i < dim; i++){\n  for(var j = 0; j < dim; j++){\n    //output the value of the element at\n    //the ith row of the jth column of the filter matrix\n    console.log(1);\n  }\n};",
    mode:  "javascript",
  });
  
  $(".code-enter").append('<div class="generate-filter generate-code">Generate</div>');
  
  $(".generate-code").click(function(){
    var val = editor.getValue();
    $.ajax({
        type: "POST",
        url: "/generate_code",
        data: {code: val},
        success: function(data, textStatus, jqXHR) {
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
          $(".filter-input-row:last-of-type").append('<input class="filter-input-col filter-input-'+((i-1)*dim+(k-1))+'" size="6" value="'+value+'" onClick="this.select();">');
        } 
      }
      creationReformat();
      updateImage(false);
      $(".filter-input-col").blur(function(){
        updateImage(false);
      });
    }
  });
  
  canvElem = document.getElementById("preview-canvas");
  canvas = canvElem.getContext("2d");
  image = new Image();
  image.src = "/assets/img"+randNum(1,4)+".jpeg";
  image.onload = function(){
    updateImage(true);
  }
  
  creationReformat();
  
  $(window).resize(function(){
    creationReformat();
  });
}

function updateImage(init){
  canvas.drawImage(image,0,0,canvElem.width,canvElem.height);
  var temp = canvas.getImageData(0,0,canvElem.width,canvElem.height);
  var weight = [[0,0,0],
                [0,1,0],
                [0,0,0]];
  if(!init){
    var dim = parseInt($(".filter-dim-input").val());
    var inArr = [dim];
    for(var i = 0; i < dim; i++){
      for(var k = 0; k < dim; k++){
        inArr.push(parseInt($(".filter-input-"+(i*dim+k)+"").val()));
      }
    }
    weight = generateWeights(inArr);
  }
  drawImage(canvElem.width,canvElem.height,processImage(temp.data,canvElem.height,canvElem.width,weight,4),canvas);
}

function creationReformat(){
  $(".CodeMirror").css("height",$(".CodeMirror").width()+"px");
  $(".preview-container").css({"top":"0","left":"0"});
  $(".preview-canvas").css({"height":$(".CodeMirror").width()+"px"});
  $(".preview-container").css({"top":($(".code-enter").offset().top-$(".preview-container").offset().top)+"px","left":($(".code-enter").width()-$(".preview-container").width()+20)+"px"});
  
  var containerWidth = $(".section-content").width()-40;
  var containerLeft = $(".section-content").offset().left;
  $(".mashup-preview, .mashup-layers, .mashup-library").css("width",((containerWidth-30)/3)+"px");
  $(".mashup-layers").css("left",((containerWidth/3)+containerLeft+5)+"px");
  $(".mashup-library").css("left",((containerWidth*2/3)+containerLeft+10)+"px");
  $(".mashup-layers, .mashup-library").css("top","0");
  $(".mashup-layers, .mashup-library").css("top",($(".mashup-preview").offset().top)+"px");
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
        $(".filter-input-row:last-of-type").append('<input class="filter-input-col filter-input-'+((i-1)*dim+(k-1))+'" size="6" value="'+value+'" onClick="this.select();">');
      } 
    }
    creationReformat();
    updateImage(false);
    $(".filter-input-col").blur(function(){
      updateImage(false);
    });
  }
}