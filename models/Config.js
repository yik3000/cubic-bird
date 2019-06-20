var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ConfigSchema = new Schema({
	version: String, 
	isUpdate: Boolean,
	isAppUpdate: Boolean,
	appSecret: String,
	isMaintain: Boolean,
	maintainEnd: String,
	updateTips: String,
	isShowSlide: Boolean,
	doubaolulink: String,
	printerOn: Boolean
})

module.exports = mongoose.model('config', ConfigSchema);

