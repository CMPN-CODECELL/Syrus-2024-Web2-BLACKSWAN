const  {Router}=require("express");
const {signup,signin, userStatus, getUserData, updateName,updateBio,updateProfilePic,bookmarkPost,unbookmarkPost}=require("../controller/userController");
const {authMiddleware}=require("../middleware/userMiddleware");
const { getUsersForSidebar } = require("../controller/sidebarController");
const userRoutes=Router();

userRoutes.route('/signup').post(signup);
userRoutes.route('/signin').post(signin);
userRoutes.route('/userStatus').get(authMiddleware, userStatus);
userRoutes.route('/getUser').get(authMiddleware, getUserData)
userRoutes.route('/sidebar').get(authMiddleware, getUsersForSidebar);
userRoutes.route('/bookmark').post(authMiddleware,bookmarkPost);
userRoutes.route('/rmvbookmark').post(authMiddleware,unbookmarkPost);
userRoutes.route('/update-name').post(authMiddleware,updateName);
userRoutes.route('/update-bio').post(authMiddleware,updateBio);
userRoutes.route('/update-profile-pic').post(authMiddleware,updateProfilePic);
module.exports=userRoutes; 