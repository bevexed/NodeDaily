const  ejs = require('ejs')
ejs.renderFile('./1.ejs',{
    name:123,
    json:{
        arr:[
            '123','456'
        ]
    }
},function (err,data) {
    console.log(data);
})