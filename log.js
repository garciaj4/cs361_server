/* Log routing */
module.exports = function(){
    
	var express = require('express');
    var router = express.Router();

	/* Adds all logs to context */
    function getLogs(res, mysql, context, complete){
        mysql.pool.query("SELECT l_id, l_description, l_time FROM log ORDER BY DATE(l_time) ASC, TIME(l_time) ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.log = results;
            complete();
        });
    }

	/* Displays all logs */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLogs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.send(context.log);
            }
        }
    });

	/* Adds log entry */
    router.post('/', function(req, res){
		
		console.log("SERVER RECEIVED:" + req.body.logtext);
		
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO log (l_description, l_time VALUES (?, NOW()))";
        var inserts = [req.body.logtext];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
				res.status(200);
                res.end();
            }
        });
    });

    return router;
}();