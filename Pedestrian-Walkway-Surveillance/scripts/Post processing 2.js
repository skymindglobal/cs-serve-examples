var newMsg = {};
var output = msg["loss3/loss3_Y"];
toreshape = output[0].length / 2;
var data = nj.array(output).reshape(toreshape, 2);
var result = countGender(data);
newMsg.person = msg.person;
newMsg.alert = msg.alert;
newMsg.numnomaskref = msg.numnomask;
newMsg.bbox = msg.bbox;
newMsg.croppedImg = msg.croppedImg;
newMsg.image = msg.image;
newMsg.cropcoors = msg.cropcoors;
newMsg.moutarr = msg.moutarr;
newMsg.goutarr = result[2];

function countGender(data) {
    male = 0;
    female = 0;
    gtempout = [];
    for (iGender=0; iGender<data.shape[0]; iGender++) {
        index=0;
        maxi=data.get(iGender,0);
        for (var i=0;i<2;i++) {
            check = data.get(iGender,i);
            if (maxi>=check) {
                maxi = maxi;
            }else {
                maxi = check;
                index = i;
            }
        }
        gtempout[iGender] = index;
        if (index===0) {male++}
        else {female++}
    }
    return [male, female, gtempout];
}

return {msg: newMsg, metadata: metadata, msgType: msgType};