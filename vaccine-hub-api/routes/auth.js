const express = require("express")
const {User} = require("../models/user")
const router = express.Router()

const {badRequestError, NotFoundError} = require("../utils/errors")






router.post("/login", async (req, res,next) => {
    try {

    }catch(error){
        next(error)
    }

})
router.post("/register", async (req, res,next) => {
    try {

    }catch(error){
        next(error)
    }
})

module.exports = router