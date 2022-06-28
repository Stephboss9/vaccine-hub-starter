const express = require("express")
const storeRouter = express.Router()
const {userAuth} = require("../models/user")
const {badRequestError, NotFoundError} = require("../utils/errors")






storeRouter.post("/login", async (req, res,next) => {
    try {

    }catch(error){
        next(error)
    }

})
storeRouter.post("/register", async (req, res,next) => {
    try {

    }catch(error){
        next(error)
    }
})