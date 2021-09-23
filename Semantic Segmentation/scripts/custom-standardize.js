var inp = msg["input"];
var in_arr = nj.array(inp);

for (k=0; k<in_arr.shape[1];k++){
    for (i=0; i<in_arr.shape[2]; i++){
        for (j=0; j<in_arr.shape[3]; j++){
            
            if (k==0) {
                inp[0][k][i][j] = (inp[0][k][i][j]-0.485)/0.229;
            }
            if (k==1) {
                inp[0][k][i][j] = (inp[0][k][i][j]-0.456)/0.224;
            }
            if (k==2) {
                inp[0][k][i][j] = (inp[0][k][i][j]-0.406)/0.225;
            }
        }
    }
}

return {msg: msg, metadata: metadata, msgType: msgType};
