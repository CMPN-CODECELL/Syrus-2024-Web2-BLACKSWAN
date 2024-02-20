
const User=require("./")
const bcrypt=require("bcrypt");
const cloudinary=require('cloudinary').v2;
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
require('dotenv').config();


const signup = async(req,res)=>{

    
try{
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(404).json({ message: "username and password are required" })
    }
    

     const existingUser=await User.findOne({
        username
     });
   
     if(existingUser){
        return res.status(400).json({
            message:"user already registered"
        })
     }

     newUser=await User.create({ username,password });
    
    const userId=newUser._id // giving userId
    
    const accessToken=generateAccessToken(userId); // takes userID as parameter
    const refreshToken=generateRefreshToken(userId);
    
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })

    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })
     
    let copyUser = { ...newUser.toObject() };
    delete copyUser.password

     res.status(200).json({
        message:"user registered succesfully",
        user:copyUser   
    })

}catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}   


}


const signin=async (req,res)=>{

    
    
    try {
      const { username, password }=req.body;
      if (!username || !password) {
        return res.status(404).json({ message: "username and password are reqruired" })
      }
   
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return res.status(400).json({ message: "User is not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const userId=existingUser._id;

    const accessToken=generateAccessToken(userId);
    const refreshToken=generateRefreshToken(userId);
    
    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })




    const copyUser = { ...existingUser.toObject() };
    delete copyUser.password;
    console.log(copyUser);
    res.status(200).json({ message:"wlcome back user", user: copyUser });

} catch (err) {
    // Handle validation errors or other errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}


}

const userStatus = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (user) {
            return res.status(200).json({ user: user, userStatus: true});
        }

        return res.status(200).json({ userStatus: false })
    } catch (error) {
        return res.status(500).json({ message: "some error occured", userStatus: false });
    }
};

const bookmarkPost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;

        // Update user's document to add the postId to the bookmarks array
        await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: postId } });

        res.status(200).json({ message: 'Post bookmarked successfully' });
    } catch (error) {
        console.error("Error bookmarking post:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const unbookmarkPost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;

        // Update user's document to remove the postId from the bookmarks array
        await User.findByIdAndUpdate(userId, { $pull: { bookmarks: postId } });

        res.status(200).json({ message: 'Post unbookmarked successfully' });
    } catch (error) {
        console.error("Error unbookmarking post:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateName = async (req, res) => {
    const { name } = req.body;
    try {
        const userId = req.userId;
        const user = await User.findByIdAndUpdate(userId, { name }).select('name -password');
        res.status(200).json({ message: 'Name updated successfully',user });
}
catch (error) {
    console.error("Error updating name:", error.message);
    res.status(500).json({ error: "Internal server error" });
}
};

const updateBio = async (req, res) => {
    const { bio } = req.body;
    try {
        const userId = req.userId;
        const user = await User.findByIdAndUpdate(userId, { bio }).select('bio -password');
        res.status(200).json({ message: 'Bio updated successfully',user });
}
catch (error) {
    console.error("Error updating bio:", error.message);
    res.status(500).json({ error: "Internal server error" });
}
}

const updateProfilePic=async(req,res)=>{
    const {profilePic}=req.body;
    try{
        const uploadedResponse=await cloudinary.uploader.upload(profilePic);
        const userId=req.userId;
        const user=await User.findByIdAndUpdate(userId,{profilePic:uploadedResponse.secure_url});
        res.status(200).json({message:"ProfilePic updated successfully",user});
}
catch(error){
    console.error("Error updating profilePic:", error.message);
    res.status(500).json({ error: "Internal server error" });
}
}

const getUserData = async (req, res) => {
    try {
        const id = req.userId;

        const userInfo = await User.findById(id);

        if (!userInfo) {
            return res.status(404).json({ error: "user not found" });
        }

        const userData = userInfo.toObject();

        delete userData.password;
        delete userData.bookmarks;

        return res.status(200).json({ message: "user found", user: userData });
    } catch (error) {
        console.log("error in get user data", error);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports={signup,signin, userStatus,updateName,updateBio,updateProfilePic,bookmarkPost,unbookmarkPost, getUserData}