var express = require('express');
var request = require('request');
var User = require('./schemas');
var mongoose = require('mongoose');
var CONSUMMER_KEY = "3xfyywIZKozXYI9dWK1AGGQX3BXOIcpe";
var SECRET_KEY = "RROzuSpltKp6AasJ";
var mlabUrl = 'mongodb://tonny:888@ds015740.mlab.com:15740/npmdb';
var app = express();
var db = mongoose.connect(mlabUrl);

var autodeskAuth = function(cllientId, cientSecret, callback){
    var options = {
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:{
            'client_id': cllientId,
            'client_secret': cientSecret,
            'grant_type': 'client_credentials'
        }
    }
    var httpResponse = function(err, res, body){
        console.log(body);
        callback(body);
    };
    request(options, httpResponse);
};

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index1', {
        message: 'Hello ejs!!'
    });
});

app.get('/tonny', function(req, res){
    res.send('Hello tonny!');
});

app.get('/authenticate', function(req, res){
    autodeskAuth(CONSUMMER_KEY, SECRET_KEY, function(body){
        var obj = JSON.parse(body);
        User.saveOrCreaateUser(CONSUMMER_KEY, obj);
        res.send(body);
    });
});

app.get('/view', function(req, res){
    autodeskAuth(CONSUMMER_KEY, SECRET_KEY, function(body){
        var obj = JSON.parse(body);
        res.render('viewPage', {token: obj.access_token});
    });
});


app.use('/', express.static(__dirname));
app.use('/scripts', express.static(__dirname + '\\views\\scripts'));
app.use('/testbuilding', express.static(__dirname + '\\download\\整棟'));
app.listen(3000);





/*var http = require('http');

var hello = function(req, res) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.write('Hello World');
		res.end();

};

var server = http.createServer(hello);

server.listen(3000);*/