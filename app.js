const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const chatRouter = require('./src/routes/chat.route')
const app = express()
app.use(bodyParser.json());
app.use(cors());
app.options("*",cors())

app.use("/",chatRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("server running on port "+PORT)
})

