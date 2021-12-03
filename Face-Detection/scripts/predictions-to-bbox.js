box = [0,0,0,0]
score = 0;

threshold = 0.99;
boxes = msg.boxes[0];
confidences = msg.scores[0];

for (var i = 0; (i * 2) < confidences.length; i++) {
    score_index = i * 2;
    box_index = i * 4;
    current_score = confidences[score_index + 1];
    if (current_score > threshold && current_score > score) {
        score = current_score;
        box = [boxes[box_index], boxes[box_index + 1], boxes[box_index + 2], boxes[box_index + 3]]
    }
} 

msg.bbox = {
    "@x1": box[0],
    "@y1": box[1],
    "@x2": box[2],
    "@y2": box[3],
    "label" : "face",
    "probability" : score
};

return {msg: msg, metadata: metadata, msgType: msgType};