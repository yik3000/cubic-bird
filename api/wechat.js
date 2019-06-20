const async = require('async');
const verificationHelper = require('../utility/verificationHelper.js');
const jwt = require('jsonwebtoken');
const Config = require('../models/Config.js');
const crudTool = require('../utility/crudtools.js');
const express = require('express');
const bodyParser = require('body-parser');

const Client = require('node-rest-client').Client;
const SHA1 = require('../utility/sha.js');
const User = require('../models/User.js');

var staffTokenValidFor = 60 * 60 * 24 * 2;


module.exports = function(app, configs){
   var wechatRoutes = express.Router();
	wechatRoutes.use(bodyParser.json());
   wechatRoutes.post('/wechatGetSession',verificationHelper.verify, function(req, res){
      const wechatAppId = configs.wechatAppId;
      const wechatSecret = configs.wechatSecret;

	if(crudTool.ensure(req, res,["code"]) == false){
		return crudTool.failed(res,"W001","没有code");         
	}
      
      var url = "https://api.weixin.qq.com/sns/jscode2session?appid="+wechatAppId+"&secret="+wechatSecret+"&js_code=" + req.body.code + "&grant_type=authorization_code";   
      var client = new Client();
      client.get(url, function(data){
      	data = JSON.parse(data);
		  if(data.session_key && data.openid){
      			async.waterfall([
      				function(next){
                        User.findOne({openId: data.openid}).exec(next)
      				},
      				function(user, next){
      					if(!user){      	
      						var newUser = new User({
      							openId: data.openid,
      						});
      						return newUser.save(function(err,user){
      							return next(err,user);
      						});
      					}
      					else{
      						return next(null, user);
      					}
      				},
      				function(user,next){
						user.sessionId = data.session_key.trim()
						var sig = SHA1(req.connection.remoteAddress + 'UZ' + user.sessionId);				
						user.localSession = sig;
      					user.save(function(err,user){
      						return next(err,user);
      					});
      				}
      			],function(err,result){
      				return crudTool.respond(res,err,{ sessionId: result.localSession})
      			})
      		}
      		else{
      			return crudTool.failed(res,"W005",'错误的微信Session Code')
      		}
      }).on('error',function(err){
      		return crudTool.failed(res, err);
      });

   })

	wechatRoutes.post('/wechatlogin', verificationHelper.verify, function(req,res){
		if(crudTool.ensure(req, res,["sessionId"]) == false){
			return crudTool.failed(res,"W001","没有sessionId");
		}
		async.waterfall([
			function(next){
				Config.findOne({_id:configs.appId}).exec(function(err,config){
					if(err) return next(err);
					if(config)
					{
						if(config.isMaintain == true){
							next({erorrNo:'W005', errorMsg: '系統維護'})
						}
						else{
							next(null)
						}
					}
					else{
						return next({errorNo:'W005', errorMsg:'系统出现错误'})
					}
				})
			},
			function(next){
                User.findOne({localSession: req.body.sessionId.trim()}).exec(function(err,result){
					next(err,result);
		      	})
			},
			function(wechatSession, next){				
				if(!wechatSession) return next("无法找到微信Session");
				var compared = SHA1(req.connection.remoteAddress + 'UZ' + wechatSession.sessionId);								
				if(req.body.sessionId.trim() != compared){
					return next('用户常识在其他设备登陆，非法操作')
				}				
				User.findOne({	
					openId:wechatSession.openId,
				}).exec(function(err,user){
					return next(err,user, wechatSession)
				})				
			},
			function(user, wechatSession, next){
				if(!user){
					return next("无法配对用户");
				}
				var signedData = {
					_id: user._id,
					username: user.username,
					companyId: user.companyId,
					roles: user.roles,
					password: user.password,
					staff: true,
				};	
				var token = jwt.sign(signedData, app.get('superSecret'), {
					  expiresIn: staffTokenValidFor,
				});
				wechatSession.lastSeen = new Date();
				wechatSession.save();



				return next(null,{
						userId: user._id,
						accesstoken: token
					});
				}
		], function(err,result){
			crudTool.respond(res,err,result);
		})
	})
	wechatRoutes.post('/wechatRegister', verificationHelper.verify, function(req,res){
		if(crudTool.ensure(req, res,["sessionId","username","password"]) == false){
			return crudTool.failed(res,"W001","没有sessionId");
		}
		async.waterfall([
			function(next){
				User.findOne({localSession: req.body.sessionId}).exec(next);
			},
			function(user,next){
				if(!user) return next("无法找到用户");
				else return next(null, user.openId);
			},
			function(openId, next){
				User.findOne({username:req.body.username}).exec(function(err,user){
					return next(err, openId, user)
				});
			},
			function(openId, user,next){
				if(user){
					user.comparePassword(req.body.password,function(err,isMatch){
						if(isMatch){
							return next(null, openId, user);
						}
						else return next('登陆信息错误');							
					})				
				}
				else return next('登陆信息错误');
			},
			function(openId, user,next){
				user.openId = openId;
				user.save(function(err,user){
					next(err,user)
				});
			},
			function(user,next){
				var signedData = {
					_id: user._id,
					username: user.username,
					companyId: user.companyId,
					roles: user.roles,
					password: user.password,
					staff: true,
				};	
				var token = jwt.sign(signedData, app.get('superSecret'), {
					  expiresIn: staffTokenValidFor,
				});
				return next(null,{
						userId: user._id,
						accesstoken: token
					});
				}							
		], function(err,result){
			crudTool.respond(res,err,result);
		});
   })
   app.use('/wechat',wechatRoutes);
}