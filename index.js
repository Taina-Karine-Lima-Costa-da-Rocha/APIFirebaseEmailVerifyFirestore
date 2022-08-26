require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const getUsers = require("./src/Router/testeSendEmail")

const Port = process.env.DB_ACESS

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use(getUsers)

app.listen(Port, () => {
    console.log(`Is Running in port http://localhost:${process.env.DB_ACESS}`)
})
