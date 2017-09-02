const fs = require('fs');
function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        var finalArray = [];
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            var trimLine = line.trim();
            remaining = remaining.substring(index + 1);
            if(trimLine.indexOf('//') ==0){
                if(line.indexOf('//')>-1){
                    var endline = line.indexOf('\n');
                    remaining = remaining.substring(endline + 1)
                    index = remaining.indexOf('\n');
                }
                else{
                    func(line);
                    finalArray.push(line);
                    index = remaining.indexOf('\n');
                }
            }else{
                if(line.indexOf('/*') >-1){
                    line = remaining.indexOf('*/');
                    remaining = remaining.substring(line + 2);
                    index = remaining.indexOf('\n');
                }
                else{
                    func(line);
                    finalArray.push(line);
                    index = remaining.indexOf('\n');
                }
            }
        }
        fs.writeFile('./output.cpp', finalArray.join('\n'), function(err) {})
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

function func(data) {
    console.log('Line: ' + data);
}

var input = fs.createReadStream('helloWorld.cpp');
readLines(input, func);

