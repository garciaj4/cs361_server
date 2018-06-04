/* Reminder routing */
module.exports = function(){
    
	var express = require('express');
    var router = express.Router();

	function getUser(res, mysql, context, u_id, complete){
		mysql.pool.query("SELECT id, fname, lname, email FROM users WHERE id=?", [u_id],  function(err, rows){
        if(err){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.user = rows;
        console.log(rows);
        complete();
		})
	}

	/* Displays user information */
	router.get('/', function(req, res){
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getUser(res, mysql, context, req.query.id, complete);
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.send(context.user);
			}
		}
	});

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM users WHERE id = ?";
        sql = mysql.pool.query(sql, req.params.id, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    return router;
}();