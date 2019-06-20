const Curriculumn = require('../models/Curriculumn');
const Course = require('../models/Course');
const Roles = require('../lib/role.js');
const async = require('async')

exports.index = (req, res) => {
    async.waterfall([
        function(next){
            Curriculumn.find({}).exec(next)
        },
    ],function(err,list){
        res.render('curriculumn/list', {
            title: 'Curriculumn',
            data:list,
          });              
    });
};

exports.add = (req, res) => {
   
    res.render('curriculumn/add',{
        title:'Add Class'
    })
}

exports.postAdd = (req, res) =>{
    const newClass = new Curriculumn({
        name: req.body.name,      
    })
    Curriculumn.findOne({name:req.body.name},(err,existingClass)=>{
        if(err) console.log(err);
        if(existingClass){
            req.flash("errors",{msg:"已经有相同的名"});
            return res.redirect("../curriculumn/add");
        }
        newClass.save((err)=>{
            if(err){
                console.log(err)
                req.flash("errors",{msg:err})
            }
            res.redirect('../curriculumn');
        })
    })
}

exports.getEdit = (req,res) =>{
    async.waterfall([
        function(next){
            Curriculumn.findOne({_id:req.params.id}).populate('courses').lean().exec(next)
        },
        function(curiculumns, next){
            Course.find({}).exec(function(err,courses){
                next(err,curiculumns, courses)
            })
        }
    ],function(err, curiculumns, courses){    
        
        if(err) console.log(err)
        res.render('curriculumn/edit',{
            title:'edit',
            data:  curiculumns,
            includedCourses: curiculumns.courses,
            courses: courses
        })
    })
}


exports.postEdit = (req,res) =>{
    classes = JSON.parse(req.body.classes);
    async.waterfall([
        function(next){
            Curriculumn.findOneAndUpdate({_id:req.params.id}, {
                courses: classes.map(x=>x._id),
                name:req.body.name,
            }).exec(next)
        }
    ],function(err,data){        
        res.redirect('../../curriculumn')
    })
}