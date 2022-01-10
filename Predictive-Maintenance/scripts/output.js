// Output post-process
if(parseInt(msg.output) == 0){
    msg.result = "Normal";
}else{
    msg.result = "Require maintenance"; 
}

return {msg: msg, metadata: metadata, msgType: msgType};