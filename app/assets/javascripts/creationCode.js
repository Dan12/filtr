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
  
  $(".preview-container").css("height",$(".preview-container").css("width")+"px");
  
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
      $(".filter-input-col").blur(function(){
        updateImage();
      });
    }
  });
}

function updateImage(){
  console.log("Update Image");
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
    $(".filter-input-col").blur(function(){
      updateImage();
    });
  }
}