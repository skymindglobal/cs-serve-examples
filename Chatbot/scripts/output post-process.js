var possible_tag = msg.dense_2[0];
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
var max_idx = indexOfMax(possible_tag);
var dict = {
  0: ["I'm Joana, your bot assistant", "I'm Joana, an Artificial Intelligent bot"],
  1: ["Please provide us your complaint in order to assist you", "Please mention your complaint, we will reach you and sorry for any inconvenience caused"],
  2: ["You can just easily create a new account from our web site", "Just go to our web site and follow the guidelines to create a new account"],
  3: ["See you later", "Have a nice day", "Bye! Come back again"],
  4: ["Hello", "Hi", "Hi there"],
  5: ["Tell me how can assist you", "Tell me your problem to assist you", "Yes Sure, How can I support you"],
  6: ["You can call me Joana.", "I'm Joana!", "Just call me as Joana"],
  7: ["Happy to help!", "Any time!", "My pleasure", "You're most welcome!"]
}
var responses = dict[max_idx];
//choose random response
var random_response_id = Math.floor(Math.random() * responses.length)
msg.response = responses[random_response_id];
return {msg: msg, metadata: metadata, msgType: msgType};