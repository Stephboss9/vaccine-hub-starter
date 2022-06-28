const db = require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError, UnauthorizedError} = require("../utils/errors")
class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            date: user.date,
            location: user.location
        }
    }


    static async login(credentials) {
        //get user email and password from the argument provided
        //if any of those fields are missing throw an error
        const requiredFields = ["email", "password"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){throw new BadRequestError(`Missing ${field} in request body`)}
        })

        if (credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email")
        }
        //look for the user by email in the submitted db 
        const existingUser = await User.fetchUserByEmail(credentials.email)

       
        //compare the password with password associated with email in db
        //if there is a match return the user if not return an error
        if(existingUser){
            let isValid = await bcrypt.compare(credentials.password, existingUser.password)
            if(isValid) {
                return User.makePublicUser(existingUser)
            }
        } 
        throw new UnauthorizedError(`Invalid email/password combo`)
    }



    static async register(credentials) {
        //register the user with required info
        const requiredFields = ["email", "password", "firstName", "lastName", "location", "date"]

        //if any of these are missing throw an error
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){throw new BadRequestError(`Missing ${field} in request body`)}
        })

        if (credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email")
        }
        //make sure system with the same information does not already existed
        const existingUser = await User.fetchUserByEmail(credentials.email)

        if(existingUser){
            throw new BadRequestError(`Duplicate Email: ${credentials.email}`)
        }
        //hash user's password
        //lowercase the email
        const lowercaseEmail = credentials.email.toLowerCase()
        console.log("in register method")

        const hashedPW = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        const date = new Date().toISOString()
        //insert new row of user info into the db
        const result = await db.query(`
        INSERT INTO users (
            password, 
            first_name,
            last_name,
            email,
            location,
            date
        ) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, first_name, last_name, location, date;
            `
        , [hashedPW, credentials.firstName, credentials.lastName, lowercaseEmail, credentials.location, credentials.date])
        // return the user

        const user = result.rows[0]
        console.log("returning user")
        return User.makePublicUser(user)
    }

    static async cancelApt(credentials) {
          //register the user with required info
          const requiredFields = ["email", "password", "firstName"]

          //if any of these are missing throw an error
          requiredFields.forEach(field => {
              if(!credentials.hasOwnProperty(field)){throw new BadRequestError(`Missing ${field} in request body`)}
          })
  
          if (credentials.email.indexOf("@") <= 0){
              throw new BadRequestError("Invalid email")
          }
          //make sure system with the same information does not already existed
          const existingUser = await User.fetchUserByEmail(credentials.email)
  
          if(existingUser){
             const result = await db.query(`DELETE FROM users where email = $1
              `,[credentials.email.toLowerCase()])

              let user = result.rows[0]
              return user;
          } else {
            throw new UnauthorizedError(`You have no existing apt associated with that email`)
          }

    }

    static async updateApt(credentials) {
        const requiredFields = ["email", "password", "firstName", "location", "date"]
        
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){throw new BadRequestError(`Missing ${field} in request body`)}
        })

        if (credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email")
        }
        //make sure system with the same information does not already existed
        const existingUser = await User.fetchUserByEmail(credentials.email)

        if(existingUser){
           const result = await db.query(`UPDATE users 
           SET  date = $1,
                location = $2
           where email = $3
            `,[credentials.date, credentials.location, credentials.email.toLowerCase()])

            const query = `SELECT * FROM users WHERE email = $1`
            const userResult = await db.query(query, [credentials.email.toLowerCase()])
            let user = userResult.rows[0]
            return User.makePublicUser(user);
        } else {
          throw new UnauthorizedError(`You have no existing apt associated with that email`)
        }

    }

    static async fetchUserByEmail (email)
    {
    if(!email) {
        throw new BadRequestError("No email provided")
    }

    const query = `SELECT * FROM users WHERE email = $1`
    const result = await db.query(query, [email.toLowerCase()])
    const user = result.rows[0] //whenever a query is executed, postgres returns result in rows
    return user
    }
}

module.exports = User