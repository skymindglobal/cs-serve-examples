var persondata = [msg.person];
var alertdata = [msg.alert];
var mdata = msg.moutarr;
var gdata = msg.goutarr;
time = Math.floor(metadata.ts/1000) * 1000;

msg.personData01 = persondata.concat(time).toString();
msg.alertData01 = alertdata.concat(time).toString();
msg.maskData01 = mdata.concat(time).toString();
msg.genderData01 = gdata.concat(time).toString();
return {msg: msg, metadata: metadata, msgType: msgType};