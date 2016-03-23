/**
 * Created by a on 3/23/2016.
 */
var restify = require('restify');
//var format = require("stringformat");

var server = restify.createServer({
    name: 'localhost',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.post('/', function(req,res,next) {



    var request = require('request');
    request('http://api.openweathermap.org/data/2.5/weather?q=Colombo,LK&appid=308b39e5944fe249d5abee26ad4b179a', function (error, response, body) {
        if (!error && response.statusCode == 200) {


            console.log( );


            var obj = {};
            obj.action = "speak";
            obj.file = "There are "+ JSON.parse(body).weather[0].description + ", temperature is " + (JSON.parse(body).main.temp - 273.15) + " Celsius";
            obj.result = "output";
            obj.errorfile ="";
            obj.digittimeout =5;
            obj.inputtimeout =10;
            obj.loops =0;
            obj.engine ="flite";
            obj.voice ="slt";
            obj.terminator ="*";
            obj.strip ="*";
            obj.digits =1;
            obj.nexturl = "http://127.0.0.1:9998/end";



            res.end(JSON.stringify(obj));


        }else{


            var obj = {};
            obj.action = "hangup";
            obj.cause = "NORMAL_CLEAN";
            obj.nexturl= "http://localhost/IVR/hangup.json"

            res.end(JSON.stringify(obj));

        }
    })


    console.log(req.body);


    return next();
});



server.post('/end', function(req,res,next) {



    var obj = {};
    obj.action = "hangup";
    obj.cause = "NORMAL_CLEAN";
    obj.nexturl= "http://localhost/IVR/hangup.json"

    /*

     {
     "action": "hangup",
     "cause": "NORMAL_CLEAN",
     "nexturl": "http://localhost/IVR/hangup.json"
     }
     */




    res.end(JSON.stringify(obj));

    console.log(req.body);


    return next();
});

server.listen(9998, '127.0.0.1', function () {
    console.log('%s listening at %s', server.name, server.url);
});