const express = require("express")
const { connection } = require("./confige/db")
const app = express()
require("dotenv").config()
app.use(express.json())
let cors = require("cors")
const { userRoute } = require("./routes/user.route")
const { postRoute } = require("./routes/post.route")
const { userAuthRoute } = require("./routes/userAuth")
const { authentication } = require("./middleware/authentication")
app.use(cors({
    origin: "*"
}))

let PORT = process.env.PORT
app.use("/users",userAuthRoute)
app.use(authentication)
app.use("/users",userRoute)
app.use("/posts",postRoute)

app.listen(PORT, async (req, res) => {

    try {
        await connection
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log("error while connecting")
    }

})