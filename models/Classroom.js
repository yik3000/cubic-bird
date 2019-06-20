
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classRoomSchema = new mongoose.Schema({
    name: String,    
    curriculumn:  {type:Schema.Types.ObjectId, ref: "Curriculumn"},
    coaches: [{type:Schema.Types.ObjectId, ref: "User"}],
    students: [{type:Schema.Types.ObjectId, ref: "Student"}],
    finished: {type:Boolean, default:false},
    courses:  [{type:Object}],
},{timestamps:true});

const Classroom = mongoose.model('Classroom', classRoomSchema);
module.exports = Classroom;
