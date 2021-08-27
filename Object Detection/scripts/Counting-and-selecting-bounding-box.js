var newMsg = {};
//this model can detect 80 classes of object
var obj = {0:"person", 1:"bicycle", 2:"car", 3:"motorbike", 4:"aeroplane", 5:"bus", 6:"train", 7:"truck", 8:"boat", 9:"traffic light", 10:"fire hydrant", 11:"stop sign", 12:"parking meter", 13:"bench", 14:"bird", 15:"cat", 16:"dog", 17:"horse", 18:"sheep", 19:"cow", 20:"elephant", 21:"bear", 22:"zebra", 23:"giraffe", 24:"backpack", 25:"umbrella", 26:"handbag", 27:"tie", 28:"suitcase", 29:"frisbee", 30:"skis", 31:"snowboard", 32:"sports ball", 33:"kite", 34:"baseball bat", 35:"baseball glove", 36:"skateboard", 37:"surfboard", 38:"tennis racket", 39:"bottle", 40:"wine glass", 41:"cup", 42:"fork", 43:"knife", 44:"spoon", 45:"bowl", 46:"banana", 47:"apple", 48:"sandwich", 49:"orange", 50:"broccoli", 51:"carrot", 52:"hot dog", 53:"pizza", 54:"donut", 55:"cake", 56:"chair", 57:"sofa", 58:"potted plant", 59:"bed", 60:"dining table", 61:"toilet", 62:"tv monitor", 63:"laptop", 64:"mouse", 65:"remote", 66:"keyboard", 67:"cell phone", 68:"microwave", 69:"oven", 70:"toaster", 71:"sink", 72:"refrigerator", 73:"book", 74:"clock", 75:"vase", 76:"scissors", 77:"teddy bear", 78:"hair drier", 79:"toothbrush"};

var classes = msg["yolonms_layer_1:2"];
var classes_arr = nj.array(classes);
var classes_len = classes_arr.shape[1];
num_classes_detected = classes_len/3;
var out_classes = classes_arr.reshape(1,num_classes_detected,3);
newMsg.classes_arr = out_classes;

var boxes = msg["yolonms_layer_1"];
var boxes_arr = nj.array(boxes);
var boxes_len = boxes_arr.shape[1];
num_anchor_boxes = boxes_len/4;
var anchor_boxes_arr =  boxes_arr.reshape(1,num_anchor_boxes,4);

var scores = msg["yolonms_layer_1:1"];
var scores_arr = nj.array(scores);
var scores_len = scores_arr.shape[1];
num_anchor_scores = scores_len/80;
var anchor_scores_arr = scores_arr.reshape(1,num_anchor_scores,80);

var numberofobjectdetected = 0;
var data = [];
var obj_person = 0;
var obj_bicycle = 0;
var obj_car = 0;
// 1- add variable here and initiate
for (c = 0; c<num_classes_detected; c++) {
    
    var dict = {};
    box_index = out_classes.get(0,c,2); //(0,varies,2)
    class_index = out_classes.get(0,c,1);
    score = anchor_scores_arr.get(0, box_index, class_index);
    var top = anchor_boxes_arr.get(0,box_index,0);
    var left = anchor_boxes_arr.get(0,box_index,1);
    var bottom = anchor_boxes_arr.get(0,box_index,2);
    var right = anchor_boxes_arr.get(0,box_index,3);
    
    dict['@x1'] = left/416;
    dict['@y1'] = top/416;
    dict['@x2'] = right/416;
    dict['@y2'] = bottom/416;
    dict.label = obj[class_index];
    dict.probability = score;

    data[numberofobjectdetected] = dict;
    numberofobjectdetected++;
    if (class_index===0) {obj_person++;}
    if (class_index===1) {obj_bicycle++;}
    if (class_index===2) {obj_car++;}
    // 2- add logic here for another classes counter
}

newMsg.num_of_detected_obj = numberofobjectdetected;
newMsg.bbox = data;
newMsg.person = obj_person;
newMsg.bicycle = obj_bicycle;
newMsg.car = obj_car;
// 3- add newmsg.object = new variable; for another classes
newMsg.image = msg.image;
return {msg: newMsg, metadata: metadata, msgType: msgType};