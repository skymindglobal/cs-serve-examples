var newMsg = {};

var output = msg["loss3/loss3_Y"];
var data = nj.array(output);
var j = data.shape[1];


var result =  findIndex(data,j);
newMsg.Class = result[0];
newMsg.Probability = result[1]*100;

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
    if (index===0) {return ["Male", maxi];}
    else {return ["Female", maxi];}
}

return {msg: newMsg, metadata: metadata, msgType: msgType};
