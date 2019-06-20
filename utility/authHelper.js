const datetime = require("./datetime.js");

module.exports = {
 getIndentity:function(req){
 	if(!req.user)
 		return null;
 	var user = req.user;
 	return user;
 },
 analyzeAllBut:function(method,req,res,next)
 {
 	if(req.method == method)
 	{
 		next();
 	}
 	else
 	{
			  var jwt = require('jsonwebtoken');	
			  var config = require('../config.js');
			  // check header or url parameters or post parameters for token
			  var token = req.body.token || req.query.token || req.headers['x-access-token'];
			  if(token){
				 jwt.verify(token, config.secret, function(err,decoded){
				 	if(err){
						if(err.name == "TokenExpiredError"){
							return res.json({ 	
								status: 2,
								success:false, 
								message:"登陆身份在"+datetime.formatDateOrTimeHumanize(err.expiredAt) +"已经超时，请重新登陆"});						
						}
						else{
							return res.json({ 	status: 1, 
								success:false, 
								message:"认证错误: " + err});
						}
				 	} 
				 	else
				 	{
				 		req.user = decoded;
				 		next();
				 	}
				 })		  	
			  }
			  else
			  {
			  	 return res.status(403).send({
			  	 	success:false,
			  	 	message:"no token"
			  	 })
			  }
 	}	
 },
 analyzeAllButGet:function(req,res,next){
 	module.exports.analyzeAllBut('GET',req,res,next);
 },
 analyzeAllButPost:function(req,res,next){
 	module.exports.analyzeAllBut('POST',req,res,next); 	
 },
 analyze:function(req,res,next){
			  var jwt = require('jsonwebtoken');	
			  var config = require('../config.js');
			  // check header or url parameters or post parameters for token
			  var token = req.body.token || req.query.token || req.headers['x-access-token'];
			  if(token){				 
				 jwt.verify(token, config.secret, function(err,decoded){
					if(err){
						if(err.name == "TokenExpiredError"){
							return res.json({ 	
								status: 2, 
								success:false, 
								message:"登陆身份在"+datetime.formatDateOrTimeHumanize(err.expiredAt) +"已经超时，请重新登陆"});						
						}
						else{
							return res.json({ 	status: 1, 
								success:false, 
								message:"认证错误:" + err});
						}
				 	} 
				 	else
				 	{
				 		req.user = decoded;
				 		next();
				 	}
				 })		  	
			  }
			  else
			  {
			  	 return res.status(403).send({
			  	 	success:false,
			  	 	message:"no token"
			  	 })
			  }
	}	
}