const express = require("express")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
const { UserModel } = require("../model/user.model")

const userAuthRoute = express.Router()

userAuthRoute.post("/signup",  (req, res) => {
    let { name, email, bio, password } = req.body
    try {
        bcrypt.hash(password, 5, async (er, hashedpassword) => {
            if (hashedpassword) {
                let newUser = new UserModel({ name, email, bio,password:hashedpassword })
                await newUser.save()
                res.send({ "msg": "new user added" })
            } else {
                res.send({ "msg": "failed to add new user" })
            }
        })

    } catch (error) {
        res.send({ "msg": "make sure minimum length of user name atleast 1 and maximum length of user name is less or equal to 50" })
    }
})

userAuthRoute.post("/login", async (req, res) => {
    let { email, password } = req.body
    let user = await UserModel.find({ email })
    try {
        if (user.length > 0) {
            let hashpassword = user[0].password
         
            bcrypt.compare(password, hashpassword, (err, result) => {

                if (result) {
                    jwt.sign({ userId: user[0]._id }, process.env.KEY, (er, token) => {
                        if (token) {
                            res.send({ "msg": "login successful", "token": token })
                        } else {
                            res.send({ "msg": "login failed! please signup first", "err": er })
                        }
                    })
                } else {
                    res.send({ "msg": "login failed! please signup first", "err": err })
                }
            })
        }

    } catch (error) {
        res.send({ "msg": error })

    }


})
module.exports = { userAuthRoute }