import { Router } from 'express'
import { addCategory, listCategories, updateCategory, deleteCategory } from './category.controller.js'

const router = Router()

router.post('/addCategory/:uid', addCategory)
router.get('/listCategories', listCategories)
router.put('/updateCategory/:uid/:cid', updateCategory)
router.patch('/deleteCategory/:uid/:cid', deleteCategory)

export default router