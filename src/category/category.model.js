import { Schema, model } from 'mongoose'

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        maxlength: [30, 'The category cannot exceed 30 characters']
    },
    description: {
        type: String,
        required: [true, 'The category is required'],
        maxlength: [50, 'The description cannot exceed 50 characters']
    },
    status: {
        type: Boolean,
        default: true
    }
})

export default model('category', categorySchema)