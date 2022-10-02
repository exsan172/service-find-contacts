/*
    routes file, edit this file to write your routes
*/

import express from "express"
import Controllers from "../controllers/index.js"

const router = express.Router()

router.post("/find-contact", Controllers.findNumber)
router.post("/mark-contact", Controllers.markContact)

export default router
