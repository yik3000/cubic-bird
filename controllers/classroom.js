const Classroom = require('../models/Classroom');
const Coach = require('../models/User');
const Student = require('../models/Student');
const Curriculumn = require("../models/Curriculumn");
const Courses = require('../models/Course');
const Roles = require('../lib/role.js');
const async = require('async')

exports.index = (req, res) => {
    async.waterfall([
        function(next){
            Classroom.find({ finished: false})
                .populate("coaches")
                .populate("students")
                .exec(next)
        },
    ],function(err,list){
        res.render('classroom/list', {
            data: list,
          });              
    });
};

exports.edit = (req, res) =>{
    async.waterfall([
        function(next){
            Classroom.findOne({ _id:req.params.id })
                .populate("coaches")
                .populate("students")
                .exec(next)
        },
    ],function(err,classroom){
        console.log(classroom);
        res.render('classroom/edit', {
            data: classroom,
          });              
    });
}
exports.postEdit = (req, res) =>{
    var timeTable = req.body.timetable;
    var newName = req.body.name;
   
    timeTable.map(x=>{
        var fulltime= x.date + "T" + x.time + "Z";
        var date = Date.parse(fulltime);
        x.datetime = new Date(date);
    })

    async.waterfall([
        function(next){
            Classroom.findOne({ _id:req.params.id }).exec(next);
        },
        function(classroom,next){
            classroom.courses.map(course => {
                 var updatedTime = timeTable.filter(y=>y.course == course._id)[0];
                 course.date = updatedTime.datetime;       
            })
            classroom.name = newName;      
            Classroom.findOneAndUpdate({_id:req.params.id}, classroom, next);
        }
    ],function(err,result){
        //res.redirect('../classroom/');     
        res.json({success:true})
    })

}

exports.addOne = (req, res) =>{
    async.waterfall([
        function(next){
            Curriculumn.find({}).exec(next);
        },
    ],function(err, list){
        res.render('classroom/add1',{
            data: list,
        })
    })
}

exports.postAddOne = (req, res) =>{   
    async.waterfall([
        function(next){
            Curriculumn.findOne({_id:req.body.curriculumnId}).lean().populate({
                path:'courses',
                populate:{
                    path:'ratings',
                }
            }).lean().exec(next)
        },
        function(curriculumn,next){
            curriculumn.courses.forEach(x=>{
                x.ratings = x.ratings.map(y=>{
                    return {
                        _id: y._id,
                        name: y.name,
                        score: 0,
                    }
                })    
            })                       
            var classRoom = new Classroom({
                name: "新课程",
                curriculumn: curriculumn._id,
                coaches:[],
                students:[],
                finished: false,
                courses: curriculumn.courses
            })
            classRoom.save(function(err,item){
                next(err,item);
            });
        },
    ],function(err,data){
        res.redirect('../classroom/add2/'+ data._id);     
    })
}

exports.addTwo = (req,res) =>{   
    async.waterfall([
        function(next){
            Classroom.findById({_id:req.params.id}).lean().exec(next)
        },
        function(classroom, next){
            Courses.find({}).populate('ratings').lean().exec(function(err, courses){
                next(null,classroom, courses)
            })
        }
    ],function(err,classroom, courses){
        courses.forEach(x=>{
            x.ratings = x.ratings.map(y=>{
                return {
                    _id: y._id,
                    name: y.name,
                    score: 0,
                }
            })    
        })
        res.render('classroom/add2',{ data:classroom, courses: courses  })
    })
}

exports.postAddTwo = (req, res) =>{
    var selectedClasses = JSON.parse(req.body.classes)
    //var selectedIds  = selectedClasses.map(x=>x._id);
    selectedClasses = selectedClasses.map(function(x){
        return {
            _id:x._id,
            name:x.name,
            date: new Date(),
            duration:x.duration,
            startTime: new Date(),
            done: false,    
            ratings:x.ratings,        
        }
    })
    async.waterfall([
        function(next){
            Classroom.findOneAndUpdate({_id:req.params.id},{
                courses:selectedClasses
            }, next);
        }
    ],function(err){
        res.redirect('../../classroom/add3/'+req.params.id)
    })
}



exports.addThree = (req,res) =>{   
    async.waterfall([
        function(next){
            Classroom.findById({_id:req.params.id}).lean().exec(next)
        },
        function(classroom, next){
            Coach.find({}).lean().exec(function(err, coaches){
                next(null,classroom, coaches)
            })
        }
    ],function(err,classroom, coaches){
        res.render('classroom/add3',{ data:classroom, coaches: coaches  })
    })
}

exports.postAddThree = (req, res) =>{
    var selectedClasses = JSON.parse(req.body.coaches)
    var selectedIds  = selectedClasses.map(x=>x._id);

    async.waterfall([
        function(next){
            Classroom.findOneAndUpdate({_id:req.params.id},{
                coaches:selectedIds
            }, next);
        }
    ],function(err){
        res.redirect('../../classroom/add4/' + req.params.id)
    })
}



exports.addFour = (req,res) =>{   
    async.waterfall([
        function(next){
            Classroom.findById({_id:req.params.id}).lean().exec(next)
        },
        function(classroom, next){
            Student.find({}).lean().exec(function(err, students){
                next(null,classroom, students)
            })
        }
    ],function(err,classroom, students){
        res.render('classroom/add4',{ data:classroom, students: students  })
    })
}

exports.postAddFour = (req, res) =>{
    var selectedStudents = JSON.parse(req.body.students)
    var selectedIds  = selectedStudents.map(x=>x._id);

    async.waterfall([
        function(next){
            Classroom.findOneAndUpdate({_id:req.params.id},{
                students:selectedIds
            }, next);
        }
    ],function(err){
        res.redirect('../../classroom')
    })
}




