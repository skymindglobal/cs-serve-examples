image_resize = msg["resize_image"];
//change element position in image resize
var image_resize2 = new Array(1);
for(var a=0;a<image_resize2.length;a++){
    image_resize2[a] = new Array(416);       
}
for(var b=0;b<image_resize2.length;b++){
    for(var c=0;c<image_resize2[0].length;c++){
        image_resize2[b][c] = new Array(416);       
    }
}
for(var d=0;d<image_resize2.length;d++){
    for(var e=0;e<image_resize2[0].length;e++){
        for(var f=0;f<image_resize2[0][0].length;f++){
            image_resize2[d][e][f] = new Array(3);       
        }      
    }
}

invert_c = 3;
for(var w=0;w<1;w++){
    for(var x=0;x<416;x++){
        for(var y=0;y<416;y++){
            for(var z=0;z<3;z++){
                invert_c = invert_c-1;
                image_resize2[w][x][y][z] = image_resize [w][x][y][invert_c];
            }
            invert_c=3;
        }
    }
}

var image_preprocess = new Array(1);
for(var i=0;i<image_preprocess.length;i++){
    image_preprocess[i] = new Array(416);       
}
for(var j=0;j<image_preprocess.length;j++){
    for(var k=0;k<image_preprocess[0].length;k++){
        image_preprocess[j][k] = new Array(416);       
    }
}
for(var l=0;l<image_preprocess.length;l++){
    for(var m=0;m<image_preprocess[0].length;m++){
        for(var n=0;n<image_preprocess[0][0].length;n++){
            image_preprocess[l][m][n] = new Array(3);       
        }      
    }
}
for(var i=0;i<3;i++){
    for(var j=0;j<416;j++){
        for(var k=0;k<416;k++){
            for(var l=0;l<1;l++){
                image_preprocess[l][k][j][i] = image_resize2[l][k][j][i]/255;                
            }

        }
    }
}
msg.oriimage = image_resize2;
msg.input_1 = image_preprocess;
return {msg: msg, metadata: metadata, msgType: msgType};