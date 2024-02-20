const mongoose=require("mongoose");

const bcrypt=require("bcrypt");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    name:{
        type:String,
    },
    bio:{
        type:String,   
    },
    profilePic:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    points:{
        type:Number,
    },
    ranking:{
        type:Number,
    },
    phone:{
        type:String,
    },
    events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],

});

UserSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

const User=new mongoose.model("User",UserSchema);

module.exports=User;