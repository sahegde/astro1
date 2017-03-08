'use strict';

var IndexModel = require('../models/index');
var HealthModel = require('../models/health');
var fs = require('fs')

module.exports = function (router) {

    var model = new IndexModel();
    var health = new HealthModel();

    router.get('/', function (req, res) {  
    	console.log(JSON.stringify(model));  
        res.render('index', model);
    });

    router.get('/data', function (req, res) { 
    	res.json(model.friends); 
    	model = new IndexModel();
    });

    router.get('/healthData', function (req, res) { 
        fs.readFile('/Users/hsandeep/Desktop/gitRepos/astroDataGen/astroDataGen/src/main/resources/sand/part-00000', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          data = data.slice(0,-1);
          console.log(data);
          res.json(data); 
        });
    });

    router.get('/graphData', function (req, res) { 
        res.json({
                columns: [
                    ['data1', Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1)],
                    ['data2', Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1)]
                ]
            });
    });

    router.post('/data', function(req,res) {
    	var data = null;
    	if(req.body) {
    		var body = req.body;
    		if(body.heartbeatStatus === "heartBeatOk" && body.pulseStatus === "pulseOk") {
	    		data = {
	    			"name" : body.name,
	    			"healthStatus" : "Green"
	    		}
    		}else {
    			data = {
	    			"name" : body.name,
	    			"healthStatus" : "Red"
	    		}
    		}
    	}

    	model.friends.push(data);
    	console.log(JSON.stringify(model));
    	res.json(model);
    })

};
