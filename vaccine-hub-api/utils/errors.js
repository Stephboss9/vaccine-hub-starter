class ExpressError extends Error {
    constructor(status, message){
        super()
        this.message = message
        this.status = status
    }
}

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request"){
        super(400, message);
    }

}

class NotFoundError extends ExpressError {
    constructor(message = "Not Found"){
        super(404, message);
    }
}
class UnauthorizedError extends ExpressError {
    constructor(message = "Invalid email/password combo"){
        super(404, message);
    }
}

module.exports = {ExpressError, UnauthorizedError,  BadRequestError, NotFoundError}











