const jade = require('jade');
const fs = require('fs');
let result =  jade.renderFile('./1.jade',
    {
        pretty:true,
        json:{width:'100px'},
        arr:[1,23],
        name:123,
        a:1,
        b:2,
        content:'<a>123<a>'
    });
fs.writeFile('./1.html',result,function (err) {
    if(err)
        console.log('err');
    else
        console.log('suc');
})

console.log(result);