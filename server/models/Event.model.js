const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    description:{

        type:String,
        maxLength: 200 
    },
    owner:{
        type:String,
        required:true,

    },
    participants:[{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"

    }]
    




})
const event =new mongoose.model("event",eventSchema);

module.exports=event;