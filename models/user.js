const mongoose = require("../db/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const Meme = require("./meme")

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
}, {
    timestamps: true
})

userSchema.virtual("memes", {
    ref: "Meme",
    localField: "_id",
    foreignField: "author" //name on other thing  here its task
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema)
module.exports = User