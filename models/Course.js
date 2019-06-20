
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new mongoose.Schema({
    name: String,    
    duration: Number,
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
