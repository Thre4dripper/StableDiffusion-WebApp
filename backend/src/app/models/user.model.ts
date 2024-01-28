import mongoose from 'mongoose'
import { AiModel } from '../enums/AiModel'

const UserSchema = new mongoose.Schema(
    {
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
        profilePic: {
            type: String,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            enum: Object.values(AiModel),
            default: AiModel.WIZ_MODEL,
        },
        stabilityApi: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', UserSchema)
