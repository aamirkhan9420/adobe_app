const express = require("express")
const { bcrypt } = require("bcrypt")
const { UserModel } = require("../model/user.model")
const userRoute = express.Router()


userRoute.get("/:id", async (req, res) => {
    let id = req.params.id
    let User = await UserModel.findOne({ _id: id })
    res.send({ "msg": User })

})

userRoute.put("/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    let User = await UserModel.findByIdAndUpdate({ _id: id }, data)
    res.send({ "msg": "User information updated successfully" })

})

userRoute.delete("/:id", async (req, res) => {
    let id = req.params.id
    let User = await UserModel.findByIdAndDelete({ _id: id })
    res.send({ "msg": "User deleted successfully" })

})


userRoute.get("/analytics/users", async (req, res) => {
    let UserList = await UserModel.find()
    res.send({ "msg": UserList })
})

userRoute.get("/analytics/users/top-active", async (req, res) => {
    let top_liked = await PostModel.find()

    //    to find number of post and user id   
    let x = await PostModel.aggregate([
        { $group: { _id: "$user_id", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);

    //  filtering after getting user_id
    let y = await UserModel.find({ _id: { $in: [x[0]._id, x[1]._id, x[2]._id, x[3]._id, x[4]._id] } })

    res.send({ "msg": y })
})

module.exports = { userRoute }
