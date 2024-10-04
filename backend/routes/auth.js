const router=require("express").Router();
const User=require("../model/User")

//Register
router.post("/register",async(req,res)=>{
    try {
      console.log('q',req.body)
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        //create new user
        const newUser =new User({
         fullName: req.body.fullName,
          email: req.body.email,
          password: hashPassword,
        });
        console.log(newUser)
    
        //save user and respond
        const user = await newUser.save();
       return res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err)
      }
})

//login
router.post("/login", async(req,res) => {
  try {
    const user = await User.findOne({ fullName: req.body.fullName });
    console.log(user)
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

   
   return res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports=router;