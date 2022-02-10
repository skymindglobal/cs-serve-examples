image = msg["image"];
bbox = msg["bbox"];
var character = {1: '0', 2: '1', 3: '2', 4: '3', 5: '4', 6:'5', 7:'6', 8:'7', 9:'8', 10:'9', 11:'a', 12:'b', 13:'c', 14:'d', 15:'e', 16:'f', 17:'g', 18:'h', 19:'i', 20:'j', 21:'k', 22:'l', 23:'m', 24:'n', 25:'o', 26:'p', 27:'q', 28:'r', 29:'s', 30:'t', 31:'u', 32:'v', 33:'w', 34:'x', 35:'y', 36:'z', 37:'-'};
var output = msg["306"];
output = nj.array(output);
var num_of_char = output.shape[1]/37;
output = output.reshape(num_of_char,1,37);
var data_output = [];
var  count = 0;
for (i=0;i<num_of_char;i++) {
    var index = 0;
    max = output.get(i,0,0);
    
    for (j=0;j<37;j++) {
        
        var check = output.get(i,0,j);
        
        if (max>=check) {
            max = max;
        }else {
            max = check;
            index = j;
        }
    }        
    data_output[count] = index;
    count++;
}
msg.data_output =data_output;
var real_data = [];
var count2 = 0;
for (k=0;k<num_of_char;k++) {
    if (data_output[k] != 0) {
        if (k == 0) {
            real_data[count2] = character[data_output[k]];
            count2++;
        }
        if ((k > 0) && (data_output[k-1] != data_output[k])) {
            real_data[count2] = character[data_output[k]];
            count2++;
        }
    }
}

msg.data_op = real_data;
msg.Word = real_data.join("");
msg["Plate Registration"] = real_data.join("");
msg.bbox = bbox;
msg.image = image;
return {msg: msg, metadata: metadata, msgType: msgType};