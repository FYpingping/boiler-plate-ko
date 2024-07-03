const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require("./models/User")

//application/x-www-form-urlencoded <= 이렇게 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}))

//application/json 타입 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jbh3059:id7781qy66!@boilerplate.rtq76l3.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res)=> res.send('Hello World with nodemon'))

app.post('/register', async (req, res) => {
    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    const result = await user.save().then(() =>{
        res.status(200).json({
            success: true
        })
    }).catch((err) =>{
        res.json({success: false, err})
    })

})



app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))