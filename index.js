const express = require('express')
const app = express()
const port = 4000

const config = require('./config/key');

const bodyParser = require('body-parser');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended:true})); //application/x-www-form-urlencoded 분석
app.use(bodyParser.json()); //apllication/json 분석

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected!!'))
  .catch(err=> console.log('오류:',err))


app.get('/', (req, res) => {
  res.send('Hello World!, 변경!!')
})

app.post('/register',(req,res)=>{

  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  
  const user = new User(req.body)

  user.save((err,userInfo)=> {
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})