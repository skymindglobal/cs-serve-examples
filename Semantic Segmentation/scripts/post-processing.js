var obj = {0: "background", 1:"aeroplane", 2:"bicycle", 3:"bird", 4:"boat", 5:"bottle", 6:"bus", 7:"car", 8:"cat", 9:"chair", 10:"cow", 11:"diningtable", 12:"dog", 13:"horse", 14:"motorbike", 15:"person", 16:"pottedplant", 17:"sheep", 18:"sofa", 19:"train", 20:"tvmonitor"};
    
var output = msg["out"];
var output_arr = nj.array(output);
var output_len = output_arr.shape[1];
var out_output = output_arr.reshape(1,21,480,640);

num_class = out_output.shape[1];
height = out_output.shape[2];
width = out_output.shape[3];

fulldata = [];
ifulldata = 0;

for (i=0; i<height; i++){
    data = [];
    idata = 0;
    for (j=0; j<width; j++){
        max = out_output.get(0,0,i,j);
        for (k=0; k<num_class; k++){
            if (out_output.get(0,k,i,j)>=max){
                max = out_output.get(0,k,i,j);
                imax = k;
            }

        }
        data[idata] = imax;
        idata++;
    }
    fulldata[ifulldata] = data;
    ifulldata++;
}

var result = nj.array(fulldata);
maxclassprob = nj.max(out_output);

index = 0;
filter = [];
//i for height(y)
//j for width(x)
for (i=0;i<result.shape[0];i++){
    for (j=0;j<result.shape[1];j++){
        dict = {};
        if (result.get(i,j)===0){
            //pass
        }
        else {
            x1 = j/(result.shape[1] - 1);
            y1 = i/(result.shape[0] - 1);
            x2 = (j+1)/(result.shape[1] - 1);
            y2 = (i+1)/(result.shape[0] - 1);
            dict['@x1'] = x1;
            dict['@y1'] = y1;
            dict['@x2'] = x2;
            dict['@y2'] = y2;
            dict.label = obj[result.get(i,j)];
            dict.probability = maxclassprob;
            filter[index] = dict;
            index++;
        }
    }
}
msg.bbox = filter;
return {msg: msg, metadata: metadata, msgType: msgType};
