/* Reminder routing */
module.exports = function(){
    
	var express = require('express');
    var router = express.Router();

	function getUser(res, mysql, context, u_id, complete){
		mysql.pool.query("SELECT fname, lname, email FROM users WHERE id=?", [u_id],  function(err, rows){
        if(err){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.user = rows[0];
        console.log(rows[0]);
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

    return router;
}();