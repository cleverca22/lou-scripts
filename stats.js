#!/usr/bin/node
var fs = require('fs');
var metadata = JSON.parse(fs.readFileSync('metadata.json','utf8'));
console.log('script count:',metadata.scripts.length);
