const router = require('express').Router();
const {Author} = require('../models/author');

// add author to DB 
router.post('',async (req,res)=>{
    try {
          let author = new Author(req.body);
        author = await author.save();
        res.send(author);
    } catch (error) {
        res.status(400).send('Error saving author :'+error.message);
    }
    
});

// get All authors
router.get('',async (req,res)=>{
    try {
        let authors = await Author.find();
        res.send(authors)
    } catch (error) {
        res.status(400).send('Error saving course :'+error.message);
    }
    
});

//update
router.put('/:id',async (req,res)=>{
    try {
       await Author.updateOne({_id : req.params.id}, req.body);
        res.send(await Author.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Error updating auhtor :'+error.message);
    }
    
});

router.delete('/:id',async (req,res)=>{
    try {
        let author = await Author.findByIdAndRemove(req.params.id);
        if(!author)
            return res.status(404).send('Author with id is not found');
        res.send(author);
    } catch (error) {
        res.status(400).send('Error Deleting Author :'+error.message);
    }
    
});

module.exports=router;