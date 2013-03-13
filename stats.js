#!/usr/bin/node
var fs = require('fs');
var metadata = JSON.parse(fs.readFileSync('metadata.json','utf8'));
console.log('script count:',metadata.scripts.length);
for (var x=0; x<metadata.scripts.length; x++) {
	var script = metadata.scripts[x];
	var code = fs.readFileSync(script.filename);
	var regex = /\/\/ @version[ ]+(.{0,10})/;
	var res = regex.exec(code);
	if (res) {
		console.log(script.filename,code.length,res[0]);
		if (res[1] != script.version) {
			console.log('error, script version out of sync',script.filename);
			process.exit(2);
		}
		if (['old','dumb_inject','smart_inject'].indexOf(script.type) == -1) {
			console.log('error, script type not valid',script);
			process.exit(3);
		}
	} else {
		console.log('error, script is missing a @version tag',script.filename);
		process.exit(1);
	}
}
