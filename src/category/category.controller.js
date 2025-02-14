import Product from '../product/product.model.js'
import Category from '../category/category.model.js'
import User from '../user/user.model.js'

export const addCategory = async (req, res) => {
    try {
        const { uid } = req.params
        const { name, description } = req.body

        const user = await User.findById(uid)
        if (!user || user.role === 'CLIENT_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'User not found or not an administrator'
            })
        }

        const newCategory = new Category({ name, description })
        await newCategory.save()

        res.status(200).json({
            success: true,
            message: 'Category added successfully',
            newCategory
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error adding category',
            error: err.message
        })
    }
}

export const listCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error listing categories',
            error: error.message
        })  
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { uid, cid } = req.params
        const data = req.body

        const user = await User.findById(uid)

        if (user.role === 'CLIENT_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'Only administrators can update categories'
            })
        }

        const category = await Category.findOneAndUpdate(
            { _id: cid }, { $set: data }, { new: true }
        )

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated',
            category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { uid, cid } = req.params

        const user = await User.findById(uid)

        if (!user || user.role === 'CLIENT_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'User not found or not an administrator'
            })
        }

        const defaultCategory = await Category.findOne({ name: 'default' })
        if (!defaultCategory) {
            return res.status(404).json({
                success: false,
                message: 'First, create a category with the name: default'
            })
        }

        await Product.updateMany({ category: cid }, { category: defaultCategory._id })

        const category = await Category.findByIdAndUpdate(cid, { status: false }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Category deleted',
            category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: err.message
        })
    }
}