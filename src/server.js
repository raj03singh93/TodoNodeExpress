//Import neccessary packages
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

//connect to mongoDB
mongoose.connect(process.env.MongoDBURI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if(err)
            console.log(err)
        else
            console.log("Connected to Mongo DB...")
    })

//initialize  and set up the app
const app = express()

//set view engins
app.set("view engine", "ejs")

//Add middleware for url and json parsing for request
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

//default path
let Todo = require("./Controller/TodoController")
app.use("/Todo", Todo.routes)
app.get("/", (req, res) => {
    res.send("Welcome to the app")
})

app.listen(process.env.PORT || 3001, () => { console.log("Server is up and running...") })