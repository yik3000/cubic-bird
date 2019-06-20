const User = require('../models/User');
const Roles = require('../lib/role.js');
const async = require('async')

exports.index = (req, res) => {
    async.waterfall([
        function(next){
            User.find({}).exec(next)
        },
    ],function(err,list){
        res.render('coach/list', {
            title: 'Coach',
            data:list,
          });              
    });
};

exports.add = (req, res) => {
   
    res.render('coach/add',{
        title:'Add Coach'
    })
}

exports.postAdd = (req, res) =>{
    const newUser = new User({
        username:req.body.username,
        password:req.body.password,
        profile:{
            name: req.body.name
        }
    })
    User.findOne({username:req.body.username},(err,existingUser)=>{
        if(err) console.log(err);
        if(existingUser){
            req.flash("errors",{msg:"已经有相同的用户名"});
            return res.redirect("../coach/add");
        }
        newUser.save((err)=>{
            if(err){
                console.log(err)
                req.flash("errors",{msg:err})
            }
            res.redirect('../coach');
        })
    })
}

exports.getEdit = (req,res) =>{
   
    async.waterfall([
        function(next){
            User.findOne({_id:req.params.id}).exec(next)
        }
    ],function(err,data){
    
        res.render('coach/edit',{
            title:'edit',
            data: data,
            roles:Roles
        })
    })
}


exports.postEdit = (req,res) =>{
    if(!Array.isArray(req.body.roles)){
        req.body.roles = [req.body.roles]
    }
    async.waterfall([
        function(next){
        
            User.findOneAndUpdate({_id:req.params.id}, {
                username:req.body.username,
                roles:req.body.roles.map(x=>parseInt(x)),
                profile:{
                    name: req.body.name
                }
            }).exec(next)
        }
    ],function(err,data){
        
        res.redirect('../../coach')
    })
}