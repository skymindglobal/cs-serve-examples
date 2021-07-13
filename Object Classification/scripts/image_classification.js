var newMsg = {};

var classify = {"6":"stingray", "573":"gokart", "646":"maze", "757":"rv", "791":"shopping cart"};
var output = msg["output"];
var data = nj.array(output);
var j = data.shape[1];


var result =  findIndex(data,j);
newMsg.Object = classify[result];


function findIndex(data, j) {
    var index=0;
    var maxi=data.get(0,0);
    
    for (var i=0;i<j;i++) {
        check = data.get(0,i);
        if (maxi>=check) {
            maxi = maxi;
            
            
        }else {
            maxi = check;
            index = i;
            
        }
    }
    return index;

}
return {msg: newMsg, metadata: metadata, msgType: msgType};
