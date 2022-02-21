const router = require('express').Router();
const { Course } = require('../models/course');

router.post('',async (req,res)=>{

    let course = new Course(req.body);

    await course.save();

    res.send(course);
});
router.get('',async (req,res)=>{

    let courses = await Course.find();

    res.send(courses);
} );
module.exports=router;