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
threshold = 0.93;
to_compare = msg.Identity[0];
absToCompare = nj.sqrt(nj.dot(to_compare, to_compare)).get(0);
similarities = msg.databaseReadOutput.map(function(item) {
    return {
        "name": item.username,
        "embedding": item.embeddings.split(',').map(function(item) {
            return Number(item);
        })
    };
}).map(function(item) {
    absEmbedding = nj.sqrt(nj.dot(item.embedding, item.embedding)).get(0);
    return nj.dot(item.embedding, to_compare).get(0) / (absEmbedding * absToCompare);
});
score = nj.max(similarities);
if(score < threshold) {
    result = "The user found is 'unknown'";
} else {
    result = "The user found is '" + msg.databaseReadOutput[indexOfMax(similarities)].username + "'";    
}
return {
    msg: {
        "score": score,
        "result": result
    },
    metadata: metadata,
    msgType: msgType
};
