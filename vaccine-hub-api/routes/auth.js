const express = require("express")
const user = require("../models/User")
const router = express.Router()

const {badRequestError, NotFoundError} = require("../utils/errors")


router.post("/login", async (req, res,next) => {
    try {
        const currentUser = await user.login(req.body)
        return res.status(200).json({currentUser})
    }catch(error){
        next(error)
    }

})
router.post("/register", async (req, res,next) => {
    try {
        const currentUser = await user.register(req.body)
        return res.status(201).json({user:currentUser})
    }catch(error){
        next(error)
    }
})

module.exports = router