const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/usermodel')
const itemModel = require('./models/itemmodel')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://rogelio:rogelio@cluster0.skl1wfg.mongodb.net/inventory");

app.post('/user', (req, res) => {
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    itemModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/',(req, res) => {
    itemModel.find({})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.post('/login',(req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json('The password or Email are incorrect')
            }
        }else{
            res.json('No record existed')
        }
    })
})

app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    itemModel.findById({_id:id})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.delete('/item/:id', (req, res) => {
    const id = req.params.id;
    itemModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.put('/item/:id', (req, res ) => {
    const id = req.params.id;
    itemModel.findByIdAndUpdate({_id:id},{
        item: req.body.item,
        stocks: req.body.stocks,
        price: req.body.price
    })
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})
