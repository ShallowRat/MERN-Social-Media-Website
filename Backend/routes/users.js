const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){ //check if user authenticated
        if(req.body.password){ //update password
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
              $set: req.body,
            });
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("Updation denied")
    }
})

//delete user
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){ //check if user authenticated
        try{
            const user = await User.fingByIdAndDelete(req.params.id);
            res.status(200).json("Account has been udeleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("Deletion denied")
    }
})

//get user 
router.get("/:id", async( req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;//carries all objects
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
})

//follow and unfollow a user
router.put("/:id/follow", async(req,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you already follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
    }
})

router.put("/:id/unfollow", async(req,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
    }
})

router.get("/",(req,res)=>{
    res.send("User Route")
})
module.exports = router;