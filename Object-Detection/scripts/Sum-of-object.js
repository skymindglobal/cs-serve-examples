var newMsg = {};
var detectedObjArray = JSON.parse(metadata.num_of_detected_obj);
var total = 0;
for (var i=0; i < detectedObjArray.length; i++) {
    total += detectedObjArray[i].value;
}
newMsg.total_object_detected_in_30s = total;
return {msg: newMsg, metadata: metadata, msgType: msgType};