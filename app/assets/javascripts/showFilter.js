function showFilterPageSetup(){
  var code = "//blur filter\nvar dim = 3;\n//your first output has to be the dimension of the filter\nconsole.log(dim);\nfor(var i = 0; i < dim; i++){\n\tfor(var j = 0; j < dim; j++){\n\t\t//output the value of the element at\n\t\t//the ith row of the jth column of the filter matrix\n\t\tconsole.log(1);\n\t}\n};"
  var inputs = "0,0,0\n0,1,0\n0,0,0";
  
  var editor = CodeMirror(document.getElementsByClassName("code-enter")[0], {
    lineNumbers: true,
    value: code,
    mode:  "javascript",
  });
  
  $(".code-enter").append('<div class="button-1 generate-code">Generate</div>');
  
  var inputRows = inputs.split("\n");
  var dim = inputRows.length;
  for(var i = 0; i < dim; i++){
    var inputCols = inputRows[i].split(",");
    $(".filter-inputs").append('<div class="filter-input-row"></div>');
    for(var j = 0; j < dim; j++){
      var value = inputCols[j];
      $(".filter-inputs div:last").append('<input class="filter-input-col filter-input-'+(i*dim+j)+'" size="6" value="'+value+'" onClick="this.select();">');
    }
  }
  
  $(".filter-input-col").blur(function(){
    updateImage(dim);
  });
  
  canvElem = document.getElementById("preview-canvas");
  canvas = canvElem.getContext("2d");
  image = new Image();
  image.src = "/assets/img"+randNum(1,4)+".jpeg";
  image.onload = function(){
    updateImage(dim);
  }
  
  $(".filter-preview-refresh").click(function(){
    image.src = "/assets/img"+randNum(1,4)+".jpeg";
    image.onload = function(){
      updateImage(dim);
    }
  });
}

function updateImage(dim){
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
    console.log(inArr);
    weight = generateWeights(inArr);
  }
  drawImage(canvElem.width,canvElem.height,processImage(temp.data,canvElem.height,canvElem.width,weight,4),canvas);
}