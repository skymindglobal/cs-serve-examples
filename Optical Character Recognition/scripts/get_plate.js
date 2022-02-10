Identity_1 = msg["Identity_1"];
Identity = msg["Identity"];
oriimage = msg["oriimage"];
var score_threshold = 0.25;
//check score array and compare with threshold
new_score = [];
boxes_idx = [];
count=-1

for(var i=0;i<Identity_1[0].length;i++){
    if (Identity_1[0][i] >= score_threshold){
        count = count + 1;
        new_score[count] = Identity_1[0][i];
        boxes_idx[count] = i;
    }
}

//get highest score
var high_score = 0;
var high_score_box_idx = 0;
for(var j=0;j<new_score.length;j++){
    if (new_score[j] > high_score){
        high_score = new_score[j];
        high_score_box_idx = boxes_idx[j];
    }
}
//reshape box result (Identity)
no_of_box = Identity[0].length/4;
new_box = new Array(no_of_box);
for(var k=0;k<no_of_box;k++){
 new_box[k] = new Array(4);       
}
x=-1;
for(var l=0;l<no_of_box;l++){
    for(var m=0;m<4;m++){
        x=x+1;
        new_box[l][m] = msg.Identity[0][x];
    }
}
//get plate bounding box
var plate_box = new_box[high_score_box_idx];
//transform plate position
var box_yx = [plate_box[1],plate_box[0]];
var box_hw = [plate_box[3],plate_box[2]];
box_mins = [];
box_maxes = [];
for (var n=0;n<2;n++){
    box_mins[n] = ((box_yx[n] - (box_hw[n] / 2.)) / 416);
    box_maxes[n] = ((box_yx[n] + (box_hw[n] / 2.)) / 416);  
}
//concatenate box min & box max
bounding_box = box_mins.concat(box_maxes);
box = [0,0,0,0];

ymin = parseInt(bounding_box[0]*416);
xmin = parseInt(bounding_box[1]*416);
ymax = parseInt(bounding_box[2]*416);
xmax = parseInt(bounding_box[3]*416);

box[0] = Math.abs(xmin);
box[1] = Math.abs(ymin); 
box[2] = Math.abs(xmax);
box[3] = Math.abs(ymax);
score = high_score*100;

msg.oriimage = oriimage;
msg.box_coordinates = box;
msg.bbox = {
    "@x1": bounding_box[1],
    "@y1": bounding_box[0],
    "@x2": bounding_box[3],
    "@y2": bounding_box[2],
    "label" : "plate",
    "probability" : score
};
return {msg: msg, metadata: metadata, msgType: msgType};