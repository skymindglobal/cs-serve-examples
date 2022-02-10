//cropimage shape
bbox = msg["bbox"];
crop_image = msg["croppedImg"];
crop_h = crop_image[0].length;
crop_w = crop_image[0][0].length;

var resize_crop = new Array(1);
for(var i=0;i<resize_crop.length;i++){
    resize_crop[i] = new Array(32);       
}
for(var j=0;j<resize_crop.length;j++){
    for(var k=0;k<resize_crop[0].length;k++){
        resize_crop[j][k] = new Array(100);       
    }
}
for(var l=0;l<resize_crop.length;l++){
    for(var m=0;m<resize_crop[0].length;m++){
        for(var n=0;n<resize_crop[0][0].length;n++){
            resize_crop[l][m][n] = new Array(3);       
        }      
    }
}

for(var e=0;e<resize_crop.length;e++){
    for(var f=0;f<resize_crop[0].length;f++){
        for(var g=0;g<resize_crop[0][0].length;g++){
            for(var h=0;h<resize_crop[0][0][0].length;h++){
                resize_crop[e][f][g][h] = 0;       
            }      
        }      
    }
}


ratio_h = parseInt(crop_h/32); 
ratio_w = parseInt(crop_w/100); 

if(ratio_w==0){
    ratio_w=1;
}
if(ratio_h==0){
    ratio_h=1;
}

set_limit_a = -1;
set_limit_b = -1;
getdata_a = false;
getdata_b = false;
for(var x=0;x<1;x++){
    for(var a=0;a<crop_h;a++){ 
        if(a%ratio_h==0){   
            set_limit_a = set_limit_a + 1; 
            getdata_a = true;
        }
        if(set_limit_a>-1 && getdata_a==true && set_limit_a<32){
            
            for(var b=0;b<crop_w;b++){  
                if(b%ratio_w==0){
                    set_limit_b = set_limit_b + 1; 
                    getdata_b=true;
                }
                if(set_limit_b>-1 && getdata_b==true && set_limit_b<100){
                    
                    for(var c=0;c<3;c++){
                        resize_crop[x][set_limit_a][set_limit_b][c]= crop_image[x][a][b][c];  
                    }
                }
                getdata_b = false;
            }
        }
        set_limit_b = -1;
        getdata_a = false;
    }
}
msg.resize_crop = resize_crop
//rgb to grayscale
flatten1 = [].concat.apply([], resize_crop);
flatten2 = [].concat.apply([], flatten1);
flatten3 = [].concat.apply([], flatten2);

grayscale_value = new Array(3200);

sum=0
count=-1;
for(var s=0;s<3200;s++){
    for(var t=0;t<3;t++){
        count=count+1;
        sum = sum + flatten3[count];
    }
    grayscale_value[s] = parseInt(sum/3)/255;
    sum=0;
}
msg.grayscale_value = grayscale_value;
crop2ocr = nj.array(grayscale_value);
ocr_size = crop2ocr.reshape(32, 100,1);
ocr_size = ocr_size.reshape(1,1, 32, 100);

msg["input.1"] = ocr_size;
msg["bbox"] = bbox;
return {msg: msg, metadata: metadata, msgType: msgType};