// Input pre-process
//inputdata is string
//convert string to array
var s2a = msg.inputid.split(',');
//convert string to float
for(var f=0; f<s2a.length;f++){
    s2a[f] = parseFloat(s2a[f]);
}
//convert 1d to 2d array
var data = new Array(s2a.length/30);
for (var a = 0; a < data.length; a++) {
    data[a] = new Array(30);
}
var cumulative = -1;
for(var i=0; i<s2a.length/30; i++){
    for(var j=0; j<30; j++){
        cumulative = cumulative+1;
        data[i][j] = s2a[cumulative];
    }
}

var useddata = [];
//if data has >30 row (takes latest 30 cycle)
for(var c=0; c<31; c++){
    useddata[30-c] =  data[data.length-c];
}

var cleancsv = [];
//remove index 4,5,9,14,20,22,23,27,28,29 (contain null or not useful)
for(var j=0; j<30; j++){
    var tempcsv = [];
    var l = -1;
    for(var k=0; k<30; k++){
        if(k!=4 && k!=5 && k!=9 && k!=14 && k!=20 && k!=22 && k!=23 && k!=27 && k!=28 && k!=29){
            l = l + 1;
            tempcsv[l] = useddata[j][k];
        }        
    }
    cleancsv[j] = tempcsv;
}

msg.chartinput = cleancsv.toString();
msg.input = [cleancsv];
return {msg: msg, metadata: metadata, msgType: msgType};