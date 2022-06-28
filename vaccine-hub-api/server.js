const express = require("express")
const cors = require("cors")
const morgan =  require("morgan")
const {PORT} = require("./config")
const app = express()

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())



app.use((req, res, next) => {
    return next(new NotFoundError("That page was not found. Ask your grandson for tech support"))
})

//bad request error route
app.use ((error, req, res, next) => {
    let status = error.status || 500
    let message = error.message ||"Something wen't wrong in the application"
    console.log("hey", message)
    return res.status(status).json({error:{status:status,message:message}})
}) 

app.listen(PORT , () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

