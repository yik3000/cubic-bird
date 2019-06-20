const async = require('async')
const Rating = require('../models/Rating').Rating;
const RatingGroup = require('../models/Rating').RatingGroup;

exports.index = (req, res) => {
    async.waterfall([
        function(next){
            RatingGroup.find()
                .populate("rating")
                .exec(next)
        },
    ],function(err,list){
        res.render('rating/list', {
            data: list,
          });              
    });
};


exports.addGroup = (req, res) =>{
    var group = req.body;
    async.waterfall([
        function(next){
            var newRatingGroup = new RatingGroup({
                name: group.groupName,
                ratings:[],
            })
            newRatingGroup.save(function(err,item){
                next(err,item);
            });
        },
        function(next,ratingGroup){
            RatingGroup.find().exec(next);
        }
    ],function(err,list){
        res.redirect('rating')
    });

}
