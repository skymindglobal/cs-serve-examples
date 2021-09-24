var sentence = msg.chat;
var arr = [];
var token_arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var diff;
var string_int;
var dict = {
'OOV': 1, 'you': 2 , 'a': 3, 'i': 4, 'me': 5, 'to': 6,
'account': 7, 'help': 8, 'what': 9, 'is': 10, 'for': 11, 
'are': 12, 'can': 13, 'need': 14, 'create': 15, 'new': 16, 
'complaint': 17, 'there': 18, 'thanks': 19, 'who': 20, 'your': 21,
'name': 22, 'please': 23, 'support': 24, 'how': 25, 'open': 26, 
'want': 27, 'an': 28, 'hi': 29, 'hey': 30, 'anyone': 31, 
'hello': 32, 'hay': 33, 'bye': 34, 'see': 35, 'later': 36, 
'goodbye': 37, 'thank': 38, "that's": 39, 'helpful': 40, 
'the':41 , 'should': 42, 'call': 43, 'whats': 44, 'could': 45, 
'give': 46, 'hand': 47, 'do': 48, 'have': 49, 'raise': 50, 
'about': 51, 'service': 52
};
//remove special characters
sentence = sentence.replace(/[^a-zA-Z0-9 ]/g, '');
//split sentence to array
arr = sentence.split(" ");
//map the string with int in dictionary
if(token_arr.length>arr.length){
    diff = token_arr.length - arr.length;
    for(var i=diff; i<token_arr.length; i++){
        string_int = dict[arr[i-diff]];
        if(string_int == null){
            string_int = 1;
        }
        token_arr[i] = string_int;
    }
}else{
    //only take the 1st 20 words
    for(var i=0; i<token_arr.length; i++){
        string_int = dict[arr[i]];
        if(string_int == null){
            string_int = 1;
        }
        token_arr[i] = string_int;
    }
}
msg.embedding_input = [token_arr];
return {msg: msg, metadata: metadata, msgType: msgType};