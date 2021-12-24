var output = msg["classes"];
out_arr = nj.array(output).reshape(2400,7);
var obj = {0: "nomask", 1:"mask"};
index = 0;
min_wh = 0.3;
max_wh = 4096;
filtered_output = [];
filtered_nomask = [];
inomask = 0;
filtered_mask = [];
imask = 0;
for (i=0; i<2400; i++) {
    conf = out_arr.get(i,4);
    if (conf > 0.3 && out_arr.get(i,2) > min_wh && out_arr.get(i,3) > min_wh && out_arr.get(i,2) < max_wh && out_arr.get(i,3) < max_wh) {
        coors = [];
        prob = sigmoid(conf/10);
        coors = xywh2xyxy(out_arr.get(i,0), out_arr.get(i,1), out_arr.get(i,2), out_arr.get(i,3));
        if (out_arr.get(i,5) * conf > out_arr.get(i,6) * conf) {
            c = 0;
            filtered_nomask[inomask] = coors.concat(prob, c);
            inomask++;
        }
        else {
            c = 1;
            filtered_mask[imask] = coors.concat(prob, c);
            imask++;
        }
        index++;
    }
}

lastmaxdetection = [];
process_detected_nomask = NMS(listInOrder(filtered_nomask));
lastmaxdetection = lastmaxdetection.concat(process_detected_nomask);
process_detected_mask = NMS(listInOrder(filtered_mask));
lastmaxdetection = lastmaxdetection.concat(process_detected_mask);


function xywh2xyxy(x, y, w, h) {
    x1 = x - w/2;
    y1 = y - h/2;
    x2 = x + w/2;
    y2 = y + h/2;
    
    return [x1,y1,x2,y2];
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function listInOrder(databyclass) {
    
    databyclassacs = [];
    masklength = databyclass.length;
    k = 0;
    for (q = 0; q < masklength; q++) {
        maxconf = databyclass[0][4];
        for (p = 0; p < databyclass.length; p++) {
            if (databyclass[p][4] >= maxconf) {
                maxconf = databyclass[p][4];
                imaxconf = p;
            }
        }
        databyclassacs[k] = databyclass[imaxconf];
        databyclass.splice(imaxconf,1);
        k++;
    }
    return databyclassacs;
}

function NMS(databyclassacs) {
    
    maxdetection = [];
    imaxdetection = 0;

    while (databyclassacs.length > 0) {
        basebox = databyclassacs[0];
        maxdetection[imaxdetection] = databyclassacs[0];
        if (databyclassacs.length===1) {
            break;
        }
        to_check = databyclassacs;
        to_check.splice(0,1);
        databyclassacs = Bboxious(basebox,to_check);
        imaxdetection++;
    }
    return maxdetection;
}

function Bboxious(box1, box2) {
    b1_x1 = box1[0];
    b1_y1 = box1[1];
    b1_x2 = box1[2];
    b1_y2 = box1[3];
    index_iou = [];
    iindex_iou = 0;

    for (ibox=0; ibox<box2.length; ibox++) {
        b2_x1 = box2[ibox][0];
        b2_y1 = box2[ibox][1];
        b2_x2 = box2[ibox][2];
        b2_y2 = box2[ibox][3];

        inter_rect_x1 = Math.max(b1_x1,b2_x1);
        inter_rect_y1 = Math.max(b1_y1,b2_y1);
        inter_rect_x2 = Math.min(b1_x2,b2_x2);
        inter_rect_y2 = Math.min(b1_y2,b2_y2);

        inter_area1 = inter_rect_x2 - inter_rect_x1 + 1;
        if (inter_area1<0) {
            inter_area1=0;
        }
        inter_area2 = inter_rect_y2 - inter_rect_y1 + 1;
        if (inter_area2<0) {
            inter_area2=0;
        }

        inter_area = inter_area1 * inter_area2;

        b1_area = (b1_x2 - b1_x1 + 1) * (b1_y2 - b1_y1 + 1);
        b2_area = (b2_x2 - b2_x1 + 1) * (b2_y2 - b2_y1 + 1);

        iou = inter_area / (b1_area + b2_area - inter_area + 1e-16);
        if (iou<0.6) {
            index_iou[iindex_iou] = box2[ibox];
            iindex_iou++;
        }
    }
    return index_iou;
}

function toBBox(finalArray, obj) {
    bbox = [];
    ibbox = 0;
    maxindex = finalArray.length;

    for (z=0; z<maxindex; z++) {
        data = {};
        data['@x1'] = finalArray[z][0]/512 - 0.01;
        data['@y1'] = finalArray[z][1]/320 - 0.01;
        data['@x2'] = finalArray[z][2]/512 + 0.01;
        data['@y2'] = finalArray[z][3]/320 + 0.01;
        data.label = obj[finalArray[z][5]];
        data.probability =finalArray[z][4];
        bbox[ibbox] = data;
        ibbox++;
    }
    return bbox;
}

function findCoors(boxcoor) {
    tempcoor = [];
    mtempout = [];
    for (icoor = 0; icoor<boxcoor.length; icoor++) {
        x1 = Math.round(boxcoor[icoor][0]) - 6;
        x2 = Math.round(boxcoor[icoor][2]) + 6;
        y1 = Math.round(boxcoor[icoor][1]) - 4;
        y2 = Math.round(boxcoor[icoor][3]) + 4;
        mtempout[icoor] = boxcoor[icoor][5];
        tempcoor[icoor] = [x1, x2, y1, y2];
    }
    return [tempcoor, mtempout];
}

function findXY(coor) {
    filtercoor = [];
    filterXY = [];
    for (i=0; i<coor.length; i++) {
        dict1  = {};
        if (coor[i]["label"] === "mask" || coor[i]["label"] === "nomask") {
            dict1['x'] = (coor[i]["@x2"] + coor[i]["@x1"])/2;
            dict1['y'] = (coor[i]["@y2"] + coor[i]["@y1"])/2;
            filterXY[i] = dict1;
            filtercoor[i] = coor[i];
        }
        else {
            //pass
        }
    }
    return filterXY;
}

function findDistance (x2, x1, y2, y1) {
    return Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
}

function classDist(coors) {
    dist = [];
    icoors = 0;
    thres_dist = 0.3;
    for (j=coors.length; j>0; j--) {
        x = coors[j - 1]['x'];
        y = coors[j - 1]['y'];
        for (k=0; k<j-1; k++) {
            coortemp = {};
            if (findDistance (x, coors[k]['x'], y, coors[k]['y']) < thres_dist) {
                coortemp['cx1'] = x;
                coortemp['cy1'] = y;
                coortemp['cx2'] = coors[k]['x'];
                coortemp['cy2'] = coors[k]['y'];
                dist[icoors] = coortemp;
                icoors++;
            }
        } 
    }
    return dist;
}

var tempmask = findCoors(lastmaxdetection);
msg.person = lastmaxdetection.length;
msg.numnomask = process_detected_nomask.length;
msg.nummask = process_detected_mask.length;;
msg.cropcoors = tempmask[0];
msg.moutarr = tempmask[1];
var bbox = toBBox(lastmaxdetection, obj);
msg.bbox = bbox;
var toClass = classDist(findXY(bbox));
msg.alert = toClass.length;
return {msg: msg, metadata: metadata, msgType: msgType};