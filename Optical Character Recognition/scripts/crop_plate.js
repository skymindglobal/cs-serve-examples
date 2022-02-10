oriimage = msg["oriimage"];
bbox = msg["bbox"];
box_coor = msg["box_coordinates"];

//real crop size
distX = box_coor[2] - box_coor[0]; //xmax-xmin
distY = box_coor[3] - box_coor[1]; //ymax-ymin

var crop = new Array(1);
for(var i=0;i<crop.length;i++){
    crop[i] = new Array(distY);       
}
for(var j=0;j<crop.length;j++){
    for(var k=0;k<crop[0].length;k++){
        crop[j][k] = new Array(distX);       
    }
}
for(var l=0;l<crop.length;l++){
    for(var m=0;m<crop[0].length;m++){
        for(var n=0;n<crop[0][0].length;n++){
            crop[l][m][n] = new Array(3);       
        }      
    }
}

count_a = -1;
count_b = -1;
for(var x=0;x<1;x++){
    for(var a=box_coor[1];a<box_coor[3];a++){
        count_a = count_a +1;
        for(var b=box_coor[0];b<box_coor[2];b++){
            count_b = count_b +1;
            for(var c=0;c<3;c++){

                crop[x][count_a][count_b][c] = oriimage[x][a][b][c];
            }
        }
        count_b = -1;
    }
    count_a = -1;
}
msg.bbox = bbox;
msg.croppedImg = crop;
return {msg: msg, metadata: metadata, msgType: msgType};