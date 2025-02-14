import {Schema, model} from 'mongoose'

const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'Please fill Name Field'],
        maxLength: [25, 'Name can not exceed 25 characters']
    }
    ,
    surname: {
        type: String,
        required: [true, 'Please fill Surname Field'],
        maxLength: [25, 'Surname can not exceed 25 characters']
    },
    username: {
        type: String,
        required: [true, 'Please fill Username Field'],
        unique: true,
        maxLength: [25, 'Username can not exceed 25 characters']
    },
    email: {
        type: String,
        required: [true, 'Please fill Email Field'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please fill Password Field']
    },
    phone: {
        type: String,
        required: [true, 'Please fill Phone Field'],
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'CLIENT_ROLE'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    }
},

{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model('User', userSchema)