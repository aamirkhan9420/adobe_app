const express = require("express")
const { connection } = require("./confige/db")
const app = express()
require("dotenv").config()
app.use(express.json())
let cors = require("cors")
app.use(cors({
    origin: "*"
}))

let PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("welcome to home")
})

app.listen(PORT, async (req, res) => {

    try {
        await connection
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log("error while connecting")
    }

})