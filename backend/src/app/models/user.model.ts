import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    //add more fields
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)