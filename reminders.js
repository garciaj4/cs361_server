/* Reminder routing */
module.exports = function(){
    
	var express = require('express');
    var router = express.Router();

	/* Adds all reminders to context */
    function getReminders(res, mysql, context, complete){
        mysql.pool.query("SELECT r_id, r_name, r_description, r_time FROM reminders ORDER BY DATE(r_time) ASC, TIME(r_time) ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.reminder = results;
            complete();
        });
    }

	/* Adds specific reminder to context */
    function getReminder(res, mysql, context, r_id, complete){
        var sql = "SELECT r_id, r_name, r_description, r_time FROM reminders WHERE r_id = ?";
		var inserts = [r_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.reminder = results[0];
            complete();
        });
    }

	/* Displays all reminders */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReminders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.send(context.reminder);
            }
        }
    });

	/* Adds reminder */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
		var inserts = [req.body.r_name, req.body.r_description, req.body.r_time];
        var sql = "INSERT INTO reminders (r_id, r_name, r_description, r_time) VALUES (NULL, ?,?,?)";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
				res.status(200);
                res.end();
			}
        });
    });

	/* Deletes reminder */
    router.delete('/:r_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM reminders WHERE r_id = ?";
        sql = mysql.pool.query(sql, req.params.r_id, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
    return router;
}();