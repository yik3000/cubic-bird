
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new mongoose.Schema({
    name: String, 
    dob: Date,
    
    parentName: String,
    parentWechatId: String,
    openId: String, 
    
}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
