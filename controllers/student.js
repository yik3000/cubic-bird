const Student = require('../models/Student');
const Roles = require('../lib/role.js');
const async = require('async')

exports.index = (req, res) => {
    async.waterfall([
        function(next){
            Student.find({}).exec(next)
        },
    ],function(err,list){
        res.render('bird/list', {
            title: 'Student',
            data:list,
          });              
    });
};

exports.add = (req, res) => {
   
    res.render('bird/add',{
        title:'Add Student'
    })
}

exports.postAdd = (req, res) =>{
    const newStudent = new Student({
        name: req.body.name,
        
        
    })
    Student.findOne({name:req.body.name},(err,existingUser)=>{
        if(err) console.log(err);
        if(existingUser){
            req.flash("errors",{msg:"已经有相同的用户名"});
            return res.redirect("../bird/add");
        }
        newStudent.save((err)=>{
            if(err){
                console.log(err)
                req.flash("errors",{msg:err})
            }
            res.redirect('../bird');
        })
    })
}

exports.getEdit = (req,res) =>{
   
    async.waterfall([
        function(next){
            Student.findOne({_id:req.params.id}).exec(next)
        }
    ],function(err,data){
    
        res.render('bird/edit',{
            title:'edit',
            data: data,
            roles:Roles
        })
    })
}


exports.postEdit = (req,res) =>{
   
    async.waterfall([
        function(next){
       
            Student.findOneAndUpdate({_id:req.params.id}, {
                name:req.body.name,
            }).exec(next)
        }
    ],function(err,data){        
        res.redirect('../../bird')
    })
}