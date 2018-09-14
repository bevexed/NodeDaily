const querystring = require('querystring');
let json = querystring.parse('user=123&pass=qw');
console.log(json);