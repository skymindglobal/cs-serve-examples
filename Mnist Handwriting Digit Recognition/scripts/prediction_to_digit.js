confidences = msg.Plus214_Output_0[0];
prob = 0;
for(var i=0; i<confidences.length; i++){
    current_score = confidences[i];
    if(current_score > prob){
        prob = current_score;
        index = i;
    }
}
msg.outputvalue = "Value is " + index;
return {msg: msg, metadata: metadata, msgType: msgType};