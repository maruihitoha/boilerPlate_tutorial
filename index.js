const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended: true}));
// application/json
//app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require("./models/User");

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World! How are you!')
})


app.post('/register', (req, res) => {

  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {

    if(err) return res.json({ success: false, err});
    return res.status(200).json({success: true});
    
  });

});

app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.

  User.findOne({email: req.body.email}, (err, user) => { // 몽고db에서 제공.
      if(!user) 
      {
        return res.json({
          loginSuccess:false,
          message: "제공된 이메일에 해당되는 유저가 없습니다.."
        });
      }
    // 데이터베이스에서 찾았다면 비밀번호를 맞춰봄
   
    
      user.comparePassword(req.body.password, (err, isMatch ) => {
        //return res.json({loginSuccess: false, message: "일단 진입."});
        
        if(!isMatch)  // 비밀번호가 틀렸다는 뜻 -> 로그인 석세스 : false
        {          
          return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
        }
        // 비밀번호까지 맞다면 토큰을 생성하기
        // JSONWEBTOKEN 라이브러리 사용
        // npm install jsonwebtoken --save
        // https://www.npmjs.com/search?q=jsonwebtoken 참조
        
        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에 ? user의 token에 담긴걸 쿠키나 로컬스토리지에 저장 가능
          // 쿠키 파서 라이브러리 설치.
          // npm install cookie-parser --save
          res.cookie("x_auth", user.token) // x_auth라는 이름의 쿠키에 토큰이 들어감
          .status(200)  // 성공
          .json({loginSuccess: true, userId:user._id});

        });
        
        

      });
    });

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



/* {
    "name":"Test",
    "email":"Test@email.com",
    "password":"TestPW"
} */