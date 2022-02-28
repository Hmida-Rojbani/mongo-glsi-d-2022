const router = require('express').Router();
const { Course, course_validation, course_validation_update} = require('../models/course');
const { Author } = require('../models/author');

router.post('',async (req,res)=>{
    let results = course_validation.validate(req.body);
    if(results.error)
        return res.status(400).send(results.error.details[0].message);

    let author = await Author.findById(req.body.author);

    if(!author)
        return res.status(404).send('Author id not found');
    
    try {
        let course = new Course(req.body);
        course.author.name = author.name;
        course.author.id = author.id;
        await course.save();
        author.courses.push(course._id);
        await author.save();
        res.send(course);
    } catch (error) {
        res.status(400).send('Error saving course : '+error.message);
    }
    
});
router.get('',async (req,res)=>{
    
    let courses = await Course.find().populate('author.id');

    res.send(courses);
} );
// TODO
// update 
router.put('/:id',async (req,res)=>{

    let results = course_validation_update.validate(req.body);
    if(results.error)
        return res.status(400).send(results.error.details[0].message);
    await Course.updateOne({_id:req.params.id}, req.body);
    res.send(await Course.findById(req.params.id));

} );

// delete (update author)
router.delete('/:id',async (req,res)=>{
    let course = await Course.findByIdAndRemove(req.params.id);
    if(! course )
        return res.status(404).send('ID not found');
    let author = await Author.findById(course.author.id);
    author.courses = author.courses.filter(c_id => c_id != course._id);
    await author.save();
    res.send(course);
} );
module.exports=router;