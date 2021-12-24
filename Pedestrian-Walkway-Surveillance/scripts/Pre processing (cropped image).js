var ccoors = msg.cropcoors;
var data = msg.data;
var img1 = nj.array(data);
function cropImg(data, ccoors) {
    var img = nj.array(data);
    var coorsarr = nj.array(ccoors);
    var pad = nj.zeros([ccoors.length,3,224,224]);
    var pad1 = nj.zeros([ccoors.length,3,224,224]);

    
    for (indexc = 0; indexc<ccoors.length; indexc++) {

        distX = ccoors[indexc][1] - ccoors[indexc][0];
        distY = ccoors[indexc][3] - ccoors[indexc][2];
        locX = Math.round((224-distX)/2);
        locY = Math.round((224-distY)/2);
        maxDist = Math.max(distX, distY);
        ratio = Math.round(224/maxDist);
        if (maxDist * ratio > 224) {
            ratio--;
        }
        if (ratio==0) {
            ratio = 1;
        }

        rlocX = Math.round((224-(distX*ratio))/2);
        rlocY = Math.round((224-(distY*ratio))/2);
        Y = ccoors[indexc][2];
        X = ccoors[indexc][0];
        
        for (i=0; i<3; i++) {
            for (j=0; j<distY; j++) {
                for (k=0; k<distX; k++) {
                    if (i==0) {
                        pad.set(indexc, 0, j+locY, k+locX, img.get(0,0,j+Y,k+X) - 104);
                        if (ratio == 1) {
                            pad1.set(indexc, 0, j+locY, k+locX, img.get(0,0,j+Y,k+X));
                        }
                        else {
                            for (iresizey=0; iresizey<ratio; iresizey++) {
                                for (iresizex=0; iresizex<ratio; iresizex++) {
                                    pad1.set(indexc, 0, (j*ratio)+rlocY+iresizey, (k*ratio)+rlocX+iresizex, img.get(0,0,j+Y,k+X));
                                    
                                }
                            }
                        }
                        
                    }
                    if (i==1) {
                        pad.set(indexc, 1, j+locY, k+locX, img.get(0,1,j+Y,k+X) - 117);
                        if (ratio == 1) {
                            pad1.set(indexc, 1, j+locY, k+locX, img.get(0,1,j+Y,k+X));
                        }
                        else {
                            for (iresizey=0; iresizey<ratio; iresizey++) {
                                for (iresizex=0; iresizex<ratio; iresizex++) {
                                    pad1.set(indexc, 1, (j*ratio)+rlocY+iresizey, (k*ratio)+rlocX+iresizex, img.get(0,1,j+Y,k+X));
                                    
                                }
                            }
                        }
                    }
                    if (i==2) {
                        pad.set(indexc, 2, j+locY, k+locX, img.get(0,2,j+Y,k+X) - 123);
                        if (ratio == 1) {
                            pad1.set(indexc, 2, j+locY, k+locX, img.get(0,2,j+Y,k+X));
                        }
                        else {
                            for (iresizey=0; iresizey<ratio; iresizey++) {
                                for (iresizex=0; iresizex<ratio; iresizex++) {
                                    pad1.set(indexc, 2, (j*ratio)+rlocY+iresizey, (k*ratio)+rlocX+iresizex, img.get(0,2,j+Y,k+X));
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
    return [pad, pad1];
}


var croppedImage = cropImg(data, ccoors);
msg["input"] = croppedImage[0];
msg.croppedImg = croppedImage[1];

return {msg: msg, metadata: metadata, msgType: msgType};