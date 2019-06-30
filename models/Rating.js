
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new mongoose.Schema({
    name: String,    
});

const ratingGroup = new mongoose.Schema({
    name: String, 
    ratings:  [{type:Schema.Types.ObjectId, ref: "Rating"}]
})

const ratingStudentSchema = new mongoose.Schema({
    student:{type:Schema.Types.ObjectId, ref:"Student"},
    course:{type:Schema.Types.ObjectId, ref:"Course"},
    classRoom:{type:Schema.Types.ObjectId, ref:"Classroom"},
    rating:{type:Schema.Types.ObjectId, ref:"Rating"},
    score:{type:Number,default:0},
    coach:{type:Schema.Types.ObjectId, ref:"Coach"},
    memo:String,
})

const Rating = mongoose.model('Rating', ratingSchema);
const RatingGroup = mongoose.model('RatingGroup', ratingGroup);
const RatingStudent = mongoose.model('RatingStudent',ratingStudentSchema);


module.exports = {Rating,RatingGroup, RatingStudent}
