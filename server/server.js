require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors= require("cors")
const corsOptions= require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 6666
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/Photos", require("./routes/Photos"))
app.use("/Posts", require("./routes/Posts"))
app.use("/Todos", require("./routes/Todos"))
app.use("/Users", require("./routes/Users"))

console.log(process.env.NODE_ENV)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    })