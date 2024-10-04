const router=require("express").Router();
const User=require("../model/User")
const bcrypt=require('bcrypt')
const Post=require('../model/Post');
const { use } = require("./User");

//update
router.put("/update",async(req,res)=>{
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt=await bcrypt.genSalt(10)
             req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try {
            const updateuser=await User.findByIdAndUpdate(req.params.Id,{
                $set: req.body,
            },{
                new:true
            });
            res.status(200).json(updateuser)
        } catch (error) {
            res.status(401).json(error)
        }
    }else{
         res.status(401).json('you can update only your account')
    }
})

//delete
router.delete("/delete",async(req,res)=>{
    if (req.body.userId === req.params.id) {
        
        try {
           const user= await User.findById(req.params.id)
           await Post.deleteMany({fullName: user.fullName})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted...")

        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json('you can delete only your account')
    }
})

//get user

router.get('/user/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        const {password,...other}=user._doc
        res.status(200).json("user get successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports=router;
