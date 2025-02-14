import { hash, verify } from 'argon 2'
import User from "./user.model.js"
import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirName = dirname (fileURLToPath(import.meta.url))

export const showUserById = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await User.findById(uid)
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User was not ofund'
            })            
        }

        return res.status(200).json({
            success: true,
            user
        })
            
    } catch (error) {
            return res.status(500).json({
            success: false,
            message:'Error while getting user',
            error: error.message
            })
    }
}

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error ocurred while getting users',
            error: error.message
        })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'User has been deleted',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error ocurred while trying to delet user',
            error: error.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const user = await User.findById(uid);

        const matchOldAndNewPassword = await verify(user.password, newPassword)

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as the old one'
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Password Updated",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the password",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true,
            message: 'User updated',
            user: updatedUser,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: err.message
        })
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: 'No new profile picture was provided',
            })
        }

        const user = await User.findById(uid)

        if (user.profilePicture) {
            const oldProfilePicturePath = join(_dirName, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicturePath)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Profile picture updated',
            user,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile picture',
            error: err.message
        })
    }
}