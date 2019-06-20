module.exports = {
 ensure: function(req, res, arrayOfVariables, fromQueryString)
 {
 	var fromQueryString = (typeof fromQueryString !== 'undefined') ?  fromQueryString : false;
 	var result = true;
 	arrayOfVariables.forEach(function(variable){
 		var variablesForRequest = [];

 		if(fromQueryString){
 			variablesForRequest = req.query;
 		}
 		else{
 			variablesForRequest = req.body;
 		}
	 	if(!variablesForRequest.hasOwnProperty(variable)){
	 		result = false;
	 	}
 	})
		 /*
 	if(result == false)
 	{
 		res.status(403).send({
			status: 1,
			errorNo: 'W02',
			errorMsg: 'Not enough parameters' 			
 		});
		 return result;
 	}
		 */
		return result;
 },
 respond: function(res,err,data){
 	if(err){
		res.status(403).send({
			status: 1,
			errorNo: 'W005',
			errorMsg: err});
	}
	else{
		res.status(200).send({
			status:0, body:data});
	}
 },
 success: function(res, body)
 {
 	return res.status(200).send({
 		status:0,
 		body: body
 	});
 },
 failed: function(res,errorNo, errorMsg)
 {
 	var errorMsgPrefix = "";
 	switch(errorNo)
 	{
 		case "W002":
 			errorMsgPrefix = "综合错误"
 			break;
 		case "W003":
 			errorMsgPrefix = "权限错误"
 			break;
 		case "W004":
 			errorMsgPrefix = "数据错误"
 			break;
 		case "W005":
 			errorMsgPrefix = "系统错误"
 			break;

 	}
 	return res.status(403).send({
 		status:1,
 		errorNo: errorNo,
 		errorMsg: errorMsgPrefix + ' : ' + errorMsg
 	})
 }
}