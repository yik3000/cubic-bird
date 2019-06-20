
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const curriculumSchema = new mongoose.Schema({
    name: String,    
    courses:  [{type:Schema.Types.ObjectId, ref: "Course"}]
});


const Curriculum = mongoose.model('Curriculum', curriculumSchema);

module.exports = Curriculum;
