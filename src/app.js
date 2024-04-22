const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const chatRouter = require('../src/routes/chat.route')
const app = express()
app.use(bodyParser.json());
app.use(cors());
app.options("*",cors())

app.use("/",chatRouter)

app.listen(5000,"0.0.0.0",()=>{
    console.log("server running on port 5000")
})

