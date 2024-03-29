const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createIndexes } = require("../models/User");

router.post("/register", async (req,res)=>{ //Sign Up
    try{ //get user and encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and error response
        const user = await newUser.save();
        res.status(200).json;
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/login", async (req,res)=>{ //Sign In
    try{ 
        const user = await User.findOne({ email: req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;