//blur filter
//The filter dimension must be an odd number
var dim = 7;
var halfDim = 3;
var std = 0.84089642;
//your first output has to be the dimension of the filter
console.log(dim);
for(var i = 0; i < dim; i++){
	for(var j = 0; j < dim; j++){
		//output the value of the element at
		//the ith row of the jth column of the filter matrix
        var x = i-halfDim;
      	var y = j-halfDim;
      var result = (1/(2*Math.PI*std*std))*Math.exp(-((x*x+y*y)/(2*std*std)));
		console.log(result);
	}
};