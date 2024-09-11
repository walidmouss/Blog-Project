import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    /*email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 100
    },*/
    username: {
        type : String,
        required: true,
        minlength: 3
    },
    password:{
        type : String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;
