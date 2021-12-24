var database = msg.databaseReadOutput;

dateacs = arrangeTime(database);
var no_mask_process = dataToTimeseries(database, dateacs);
msg.nomaskdata = no_mask_process[0];
msg.numnomask = no_mask_process[1];
var info = dataToInfo(database, dateacs);
if (msg.numnomaskref > 0) {
    msg.info = info[0].concat(nj.array(msg.croppedImg[info[1]]).reshape(1,3,224,224));
}
else {
    msg.info = ["NO MASK OFF DETECTED", "-", "-", "-", "-", "Kuala Lumpur", nj.zeros([1,3,224,224])];
}
msg.refershape = nj.array(msg.croppedImg[info[1]]).shape;
msg.refer = info[1];
msg.croppedImg = msg.croppedImg[info[1]];
var counting_process = dataToCount(database, dateacs);
msg.numperson = counting_process[0];
msg.numalert = counting_process[1];
msg.nummale = counting_process[2];
msg.numfemale = counting_process[3];

function arrangeTime(database) {
    dateacs = [];
    maskdatalength = database.length;
    for(ij=0; ij<maskdatalength; ij++) {
        textlength = database[ij].mask_data.length;
        dateacs[ij] = parseInt(database[ij].mask_data.substring(textlength - 13));
    }
    return dateacs.sort(function(a, b){return b-a});
}

function dataToTimeseries(database, dateacs) {
    dataindex = 0;
    datats = [];
    for (idataacs=0; idataacs<dateacs.length; idataacs++) {
        for (idatabase=0; idatabase<database.length; idatabase++) {
            textlength = database[idatabase].mask_data.length;
            if (parseInt(database[idatabase].mask_data.substring(textlength - 13))==dateacs[idataacs]) {
                datatext = database[idatabase].mask_data.substring(0, textlength - 13);
                var dts = new Date(dateacs[idataacs]);
                yy = dts.getFullYear().toString().substr(-2);
                mm = (dts.getMonth() + 1).toString();
                dd = dts.getDate().toString();
                time = dts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).substr(0,5).replace(":","");
                date = dd+"/"+mm+"/"+yy;
                for (i=0; i<datatext.length; i++) {
                    if (parseInt(datatext[i])==1) {
                        //pass;
                    }
                    else if (parseInt(datatext[i])==0) {
                        datats[dataindex] = [date, time, "IMG1", "MASK OFF"];
                        dataindex++;
                    }
                }
            }
        }
    }
    return [datats, dataindex++];
}

function dataToInfo(database, dateacs) {

    datats1 = [];
    ref = 0;
    var months_name = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    genderoption = ["MALE","FEMALE"];
    for (idatabase1=0; idatabase1<database.length; idatabase1++) {
        textlength = database[idatabase1].mask_data.length;
        if (parseInt(database[idatabase1].mask_data.substring(textlength - 13))==dateacs[0]) {
            datatext0 = database[idatabase1].mask_data.substring(0, textlength - 13);
            var dts1 = new Date(dateacs[0]);
            yy1 = dts1.getFullYear().toString().substr(-2);
            mm1 = dts1.getMonth();
            dd1 = dts1.getDate().toString();
            time1 = dts1.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).substr(0,5);
            date1 = dd1+" "+months_name[mm1]+" "+yy1;
            for (i1=0; i1<datatext.length; i1++) {
                if (parseInt(datatext0[i1])==1) {
                    ref++;
                    //pass;
                }
                else if (parseInt(datatext0[i1])==0) {
                    datatext1 = database[idatabase1].gender_data.substring(0, textlength - 13);
                    genderrclass = parseInt(datatext1[i1]);
                    datats1 = [genderoption[genderrclass], "Adult", "MASK OFF", date1, time1, "Kuala Lumpur"];
                    ref++;
                    referenceImg = ref - 1;
                }
            }
        }
    }
    return [datats1, referenceImg];
}

function dataToCount(database, dateacs) {

    male = 0;
    female = 0;
    numperson = 0;
    numalert = 0;

    for (idatabase2=0; idatabase2<database.length; idatabase2++) {

        ptextlength = msg.databaseReadOutput[idatabase2].person_data.length;
        numperson += parseInt(msg.databaseReadOutput[idatabase2].person_data.substring(0, ptextlength - 14));

        atextlength = msg.databaseReadOutput[idatabase2].alert_data.length;
        numalert += parseInt(msg.databaseReadOutput[idatabase2].alert_data.substring(0, atextlength - 14));

        gtextlength = database[idatabase2].gender_data.length;
        datatext2 = database[idatabase2].gender_data.substring(0, gtextlength - 14);
        for (ig=0; ig<datatext2.length; ig++) {
            if (parseInt(datatext2[ig])==0) {
                male++;
            }
            else if (parseInt(datatext2[ig])==1) {
                female++;
            }
        }
    }
    return [numperson, numalert, male, female];
}

return {msg: msg, metadata: metadata, msgType: msgType};