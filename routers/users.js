const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User,user_validation}= require('../models/user');

router.post('/signup',async (req,res)=>{
    let validation_results = user_validation.validate(req.body);
    if(validation_results.error)
        return res.status(400).send(validation_results.error.details[0].message);
    try {
        let user = new User(req.body);
        let salt = await bcrypt.genSalt(10);
        console.log('salt :',salt);
        user.password = await bcrypt.hash(user.password,salt);
        console.log('password :', user.password);
        await user.save();
        res.send('User registred');
    } catch (error) {
        
    }
    
});

router.post('/signin',async (req,res)=>{

    let user = await User.findOne({username : req.body.username});
    if(! user)
        res.status(400).send('Username or password is incorrect');
    let bool = await bcrypt.compare(req.body.password,user.password);
    if(! bool)
        res.status(400).send('Username or password is incorrect');
    // creation of JWT
    let token = jwt.sign({_id:user._id,username: user.username, role:user.role},'jwtSecret',{ expiresIn: '1h' })
    res.header('x-auth-token','Bearer '+token).send('User logged in ');
});

module.exports=router;