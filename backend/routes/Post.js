const router=require("express").Router();
const User=require("../model/User")
const bcrypt=require('bcrypt')
const Post=require('../model/Post');

//create post

router.post("/createpost",async(req,res)=>{
    const newpost=new post(req.body)
        try {
          const savedpost=  await newpost.save()
          
           return res.status(200).json(savedpost);
        } catch (error) {
            res.status(500).json(error)
        }
})


//update  post
router.put("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if (post.fullName == req.body.fullName) {
            await post.updateOne({$set: req.body},{
                new:true,
            })
            res.status(200).json('updated')
        }else{
            res.status(500).json("you update only self account")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete post
router.delete("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if (post.fullName == req.body.fullName) {
            await post.deleteOne()
            res.status(200).json('deleted')
        }else{
            res.status(500).json("you delete only self account")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// //like and dislike a post
// router.put("/:id/like", async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       if (!post.likes.includes(req.body.userId)) {
//         await post.updateOne({ $push: { likes: req.body.userId } });
//         res.status(200).json("The post has been liked");
//       } else {
//         await post.updateOne({ $pull: { likes: req.body.UserId } });
//         res.status(200).json("The post has been disliked");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  //get a post
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get all posts

  router.get("/", async (req, res) => {
    const fullName=req.query.user;
    const catName=req.query.cat;

    try {
       let posts;
       if (fullName) {
         posts=await Post.find({fullName})
       } else if(catName) {
           posts=await Post.find({
            categories:{
                $in:[catName],
            },
           });
       } else {
        posts=await Post.find()
       }res.status(200).json(posts)


    } catch (err) {
      res.status(500).json(err);
    }
  });