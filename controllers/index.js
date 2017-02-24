'use strict';

var IndexModel = require('../models/index');
var HealthModel = require('../models/health');


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
        res.json(health.val); 
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
