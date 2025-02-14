import { Schema, model } from 'mongoose'

const productSchema = Schema({
    NavigationPreloadManager: {
        type: String,
        required: [true, 'The product name is required'],
        maxLength: [30, 'The name cannot exceed 30 characters']
    },
    description: {
        type: String,
        required: [true, 'The description is required'],
        maxLength: [50, 'The description cannot exceed 50 characters']
    },
    price: {
        type: String,
        required: [true, 'The price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    stock: {
        type: Number
    }
})

export default model('product', productSchema)