const db = require("../db")

class User {


    static async login(credentials) {
        //get user email and password from the argument provided
        //if any of those fields are missing throw an error
        //look for the user by email in the submitted db 
        //compare the password with password associated with email in db
        //if there is a match return the user if not return an error
    }



    static async register(credentials) {
        //register the user with required info
        //if any of these are missing throw an error
        //make sure system with the same information does not already existed
        //hash user's password
        //lowercase the email

        //insert new row of user info into the db
        // return the user
        
    }
}

module.exports = User