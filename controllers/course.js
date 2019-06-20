const Course = require('../models/Course');
const Roles = require('../lib/role.js');
const async = require('async')

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
            Course.findOne({_id:req.params.id}).exec(next)
        }
    ],function(err,data){
    
        res.render('course/edit',{
            title:'edit',
            data: data,
        })
    })
}


exports.postEdit = (req,res) =>{
  
    async.waterfall([
        function(next){
            Course.findOneAndUpdate({_id:req.params.id}, {
                name:req.body.name,
            }).exec(next)
        }
    ],function(err,data){        
        res.redirect('../../course')
    })
}