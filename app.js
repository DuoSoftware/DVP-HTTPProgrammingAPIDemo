/**
 * Created by a on 3/23/2016.
 */

//var format = require("stringformat");

var restify = require('restify');
var server = restify.createServer({
    name: 'http api demo',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());







server.post('/readweather', function(req,res,next) {

//http://api.openweathermap.org/data/2.5/weather?zip=00400,lk&appid=308b39e5944fe249d5abee26ad4b179a


//req.body.result
    var request = require('request');
    request('http://api.openweathermap.org/data/2.5/weather?zip='+req.body.result+',LK&appid=308b39e5944fe249d5abee26ad4b179a', function (error, response, body) {
        if (!error && response.statusCode == 200) {


            console.log( );


            var obj = {};
            obj.action = "speak";
            obj.file = "There are "+ JSON.parse(body).weather[0].description + ", temperature is " + (JSON.parse(body).main.temp - 273.15) + " Celsius in "+ JSON.parse(body).name;
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
            obj.nexturl = "end";



            res.end(JSON.stringify(obj));


        }else{


            var obj = {};
            obj.action = "hangup";
            obj.cause = "NORMAL_CLEAN";
            obj.nexturl= "end"

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
    obj.nexturl= "end";
    res.end(JSON.stringify(obj));
    console.log(req.body);


    return next();
});



















server.post('/companya', function(req,res,next) {


    console.log( );

    var obj = {};
    obj.action = "playandgetdigits";
    obj.file = "Duo_IVR_Menu(1).wav";
    obj.result = "result";
    obj.errorfile ="";
    obj.digittimeout =5000;
    obj.inputtimeout =10000;
    obj.loops =2;
    obj.terminator ="*";
    obj.strip ="*";
    obj.digits =1;
    obj.nexturl = "process";



    res.end(JSON.stringify(obj));

    console.log(req.body);


    return next();

});


server.post('/process', function(req,res,next) {


    console.log( );

    /*

     {
     "action": "dialgateway",
     "context": "TestInternalPbx",
     "nexturl": "http://localhost/IVR/end.json",
     "dialplan": "XML",
     "callername": "1000",
     "callernumber" : "1000",
     "number" : "2001"
     }
     */

    var obj = {};

    switch(req.body.result){




        case '1':

            obj.action = "dial";
            obj.dialplan = "XML";
            obj.context = "default";
            obj.callername = req.body.ani;
            obj.callernumber = req.body.ani;
            obj.number = "1000";
            obj.nexturl= "end";



            break;

        case '2':

            obj.action = "dial";
            obj.dialplan = "XML";
            obj.context = "default";
            obj.callername = req.body.ani;
            obj.callernumber = req.body.ani;
            obj.number = "1001";
            obj.nexturl= "end";


            break;

        case '3':

            obj.action = "dial";
            obj.dialplan = "XML";
            obj.context = "default";
            obj.callername = req.body.ani;
            obj.callernumber = req.body.ani;
            obj.number = "1002";
            obj.nexturl= "end";



            break;

        default:

            obj.action = "hangup";
            obj.cause = "NORMAL_CLEAN";
            obj.nexturl= "end"


            break;

    }



    console.log(JSON.stringify(obj));

    res.end(JSON.stringify(obj));

    console.log(req.body);


    return next();

});


server.listen(9998, function () {
    console.log('%s listening at %s', server.name, server.url);
});
