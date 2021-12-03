var newMsg = {};
var outputdata = msg.output;
var data = nj.array(outputdata);
var a = data.shape[1];

var result = findIndex(data,a);
newMsg.iris_species = result[0];
newMsg.probability = result[1]*100;

function findIndex(data, a) {
    var index=0;
    var maxi=data.get(0,0);
    for (var i=0;i<a;i++) {
        check = data.get(0,i);
        if (maxi>=check) {
            maxi = maxi;
        }else {
            maxi = check;
            index = i;
        }
    }
    if (index == 0) {
        return ["setosa", maxi];
    }
    if (index == 1) {
        return ["versicolor", maxi];
    }
    else {
        return ["virginica", maxi];
    }
    
}
return {msg: newMsg, metadata: metadata, msgType: msgType};
