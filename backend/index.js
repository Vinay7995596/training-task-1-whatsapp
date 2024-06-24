const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = 5000


app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/vinay', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected successfully')
    })
    .catch((e) => {
        console.log(e, ":error in connection")
    })

const mongooseSchema = new mongoose.Schema({
    name: String,
    password : String,
    email : String
})

const mongooseModel = mongoose.model('userdetailswhatsapps', mongooseSchema)



app.get('/gettingdata', async (req, res) => {
    try {
        const fullDetails = await mongooseModel.find()
        res.json(fullDetails)
    } catch (e) {
        console.log(e, "error in fetching")
    }
})


// storing user details
app.post('/userlogined', async (req, res) => {
    const { name, email, password } = req.body
    const formDetailsContaining = new mongooseModel({
        name,
        email,
        password,
    })
    try {
        const newForm = await formDetailsContaining.save()
        res.status(201).json(newForm)
    } catch (e) {
        console.log(e, ";error in posting details")
    }
})


// verifying email is there or not

app.post('/userdetails', async (req, res) => {
    const {email, password} = req.body;
    try {

        const userFound = await mongooseModel.findOne({email, password})

        if(userFound) {
            res.status(200).json({message:'user found', userFound})
        }
        else {
            res.status(404).json({message: 'user not found'})
            console.log(email)
        }

    }
    catch(e) {
        console.log(e,':error in user founding')
    }
})


const mongooseSchemaFriendlist = new mongoose.Schema({
    name: String,
    
})

const mongooseModelFriemdList = mongoose.model('userdatas', mongooseSchemaFriendlist)


// getting friend

app.get('/friends', async (req, res) => {
    try {
        const fullDetails = await mongooseModelFriemdList.find()
        res.json(fullDetails)
    } catch (e) {
        console.log(e, "error in fetching")
    }
})


const moongosefriendSchema = mongoose.Schema({
    sendingYou : Boolean,
    chatId : String,
    senderId : String,
    text : String
})

const moongosefriendsmodel = mongoose.model('chatlistlistmessages',moongosefriendSchema)

app.post('/chatstored', async (req, res) => {
    const {sendingYou,chatId,senderId, text} = req.body
    const chatDataText = new moongosefriendsmodel({
        sendingYou,
        chatId,
        senderId,
        text
    })
    try {
        const newMessage = await chatDataText.save()
        res.status(200).json(newMessage)
    }
    catch(e) {
        console.log(e, ': error in chat to stored of particular person')
    }
})


app.get('/chattingOfData', async (req, res) => {
    try {
        const chatGetting = await moongosefriendsmodel.find()
        res.json(chatGetting)
    }
    catch (e) {
        console.log(e,': error in fetching of chatData of users')
    }
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})
