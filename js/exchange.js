$(function() {
// get remote json file
function convertJSON(oldFile,map) {
	$.getJSON(oldFile, function(obj) {
		console.log(obj);
	});
}

var input = {
  "custom_id": 1,
  "another_thing": "pizza",
  "step_1_message": "msg",
  "step_1_hint": "hint",
  "step_1_intent": "intent",
  "step_2_message": "msg",
  "step_2_hint": "hint",
  "step_2_intent": "intent"
};

var output = {
  steps: []
};

var keyParts, lastKey ='';

for (var key in input) {
  keyParts = key.split('_');
  if(keyParts.length===3 && keyParts[0]=='step') {
    if(lastKey!==keyParts[1]) {
      output.steps.push({"step_id":keyParts[1]});
      lastKey = keyParts[1];
    }
    output.steps[output.steps.length-1][keyParts[2]] = input[key];
  } else {
    output[key] = input[key];
  }
}

console.log(output);

// convert to object

// pull map

// create new json

convertJSON("/data/old.json");

});