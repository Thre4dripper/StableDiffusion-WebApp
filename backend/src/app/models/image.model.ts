import mongoose, { Schema } from 'mongoose'

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
        required: true,
        trim: true,
    },
    dimensions: {
        type: {
            width: Number,
            height: Number,
        },
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
    upscale: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
    },
})

export default mongoose.model('Image', imageSchema)
