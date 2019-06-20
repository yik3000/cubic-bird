
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new mongoose.Schema({
    name: String,    
});

const ratingGroup = new mongoose.Schema({
    name: String, 
    ratings:  [{type:Schema.Types.ObjectId, ref: "Rating"}]
})



const Rating = mongoose.model('Rating', ratingSchema);
const RatingGroup = mongoose.model('RatingGroup', ratingGroup);

module.exports = {Rating,RatingGroup}
