import mongoose, { Schema } from 'mongoose'

const dimensionsSchema = new Schema(
    {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
)

const imageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    positivePrompt: {
        type: String,
        required: true,
        trim: true,
    },
    negativePrompt: {
        type: String,
        required: false,
        trim: true,
    },
    dimensions: {
        type: dimensionsSchema,
        required: true,
    },
    samplingSteps: {
        type: Number,
        required: true,
        min: 1,
        max: 150,
    },
    cfgScale: {
        type: Number,
        required: true,
        min: 1,
        max: 35,
    },
    upScale: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
    },
})

export default mongoose.model('Image', imageSchema)
