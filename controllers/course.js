const Course = require('../models/Course');
const Roles = require('../lib/role.js');
const async = require('async')
const Rating = require('../models/Rating').Rating;
const RatingGroup = require('../models/Rating').RatingGroup;


exports.index = (req, res) => {
    async.waterfall([
        function(next){
            Course.find({}).exec(next)
        },
    ],function(err,list){
        res.render('course/list', {
            title: 'Course',
            data:list,
          });              
    });
};

exports.add = (req, res) => {
   
    res.render('course/add',{
        title:'Add Class'
    })
}

exports.postAdd = (req, res) =>{
    const newClass = new Course({
        name: req.body.name,      
    })
    Course.findOne({name:req.body.name},(err,existingClass)=>{
        if(err) console.log(err);
        if(existingClass){
            req.flash("errors",{msg:"已经有相同的名"});
            return res.redirect("../course/add");
        }
        newClass.save((err)=>{
            if(err){
                console.log(err)
                req.flash("errors",{msg:err})
            }
            res.redirect('../course');
        })
    })
}

exports.getEdit = (req,res) =>{
    async.waterfall([
        function(next){
            Course.findOne({_id:req.params.id}).lean().populate('ratings').exec(next)
        },
        function(course, next){
            RatingGroup.find({}).lean().populate('ratings').exec(function(err,ratingGroups){
                next(err,course,ratingGroups);
            })
        },
        function(course,ratingGroups,next){
            var flatData = ratingGroups.map(function(group){
                var ratings = group.ratings.map(function(rating){
                    rating.group = group.name;
                    return rating;
                })               
                return ratings;
            })
            var flatData = flatData.reduce(function(val,item){
                if(item){
                    (item).forEach(element => {
                        val.push(element)
                    });
                    return val;
                }               
            },[])
            next(null,course,flatData);
        }
    ],function(err,data,ratingGroups){
        res.render('course/edit',{
            title:'edit',
            data: data,
            ratings:ratingGroups,
        })
    })
}


exports.postEdit = (req,res) =>{
    console.log(req.body);
    var ratings = JSON.parse(req.body.ratings);
    async.waterfall([
        function(next){
            Course.findOneAndUpdate({_id:req.params.id}, {
                name:req.body.name,
                ratings:ratings.map(function(item){
                    return item._id
                })
            }).exec(next)
        }
    ],function(err,data){        
        res.redirect('../../course')
    })
}