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

exports.showGroup = (req,res) =>{
    async.waterfall([
        function(next){
            RatingGroup.findOne({_id:req.params.id}).populate("ratings").exec(next);
        },
    ], function(err, group){
        console.log(group);
        res.render('rating/group',{
            data: group,
        })
    })
}

exports.addGroup = (req, res) =>{
    var groupName = req.body.groupName
    async.waterfall([
        function(next){
            var newRatingGroup = new RatingGroup({
                name: groupName,
                ratings:[],
            })
            newRatingGroup.save(function(err,item){
                next(err,item);
            });
        },
        function(ratingGroup,next){
           next(null);
        }
    ],function(err,list){
        res.redirect('../rating')
    });
}

exports.addItem = (req,res) => {
    var groupId = req.params.id;
    var ratingName = req.body.ratingName;
    async.waterfall([
        function(next){
            Rating.findOne({name:ratingName}).exec(next);
        },
        function(ratingItem,next){
            if(ratingItem == null){
                var newRating = new Rating({
                    name:ratingName,
                });
                newRating.save(next);
            }
            else{
                next(ratingItem);
            }
        },
        function(ratingItem,next){
            RatingGroup.findOne({_id:groupId}).exec(function(err,ratingGroup){
                next(err,ratingGroup,ratingItem);
            });
        },
        function(group,item,next){
            console.log(group);
            var found = group.ratings.find(x=> x == item._id)
            if(found){
                next(group);
            }
            else{
                group.ratings.push(item._id);
                group.save(next);
            }
        }
    ],function(err,group){
        res.redirect("../"+groupId);
    })
}

exports.postGroup = (req,res)=>{
    async.waterfall([
        function(next){
            RatingGroup.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
            }).exec(next);
        },
    ],function(err){
        
        res.redirect(req.params.id);
    })
}
exports.showRating = (req,res)=>{
    Rating.findOne({_id:req.params.ratingId}).exec(function(err,result){
        res.render('rating/rating', {
            data: result,
          });  
    })
}
exports.editRating = (req,res)=>{
    async.waterfall([
        function(next){
            Rating.findOneAndUpdate({_id:req.params.ratingId}, {
                name: req.body.name,
            },next);
        },
    ],function(err){        
        res.redirect(req.params.ratingId);
    })
}
