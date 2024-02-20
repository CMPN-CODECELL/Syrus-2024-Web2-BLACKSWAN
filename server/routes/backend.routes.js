const  {Router}=require("express");
const userRoutes=require("./user.routes");
const messageRoutes=require("./message.routes");
const caffineRoutes=require("../routes/caffine.routes");
const postRoutes=require("./post.route");
const replyRoutes=require("./reply.routes");
const therapistRoutes=require("./therapist.routes");
const eventRoutes=require("./event.routes");
const backendroutes=Router();
backendroutes.use('/event',eventRoutes);
backendroutes.use('/therapist',therapistRoutes);
backendroutes.use('/user',userRoutes);
backendroutes.use('/event',eventRoutes);
backendroutes.use('/therapist',therapistRoutes);
backendroutes.use('/message',messageRoutes);
backendroutes.use('/post',postRoutes);
backendroutes.use('/reply',replyRoutes);
backendroutes.use('/caffeine',caffineRoutes);
module.exports=backendroutes;