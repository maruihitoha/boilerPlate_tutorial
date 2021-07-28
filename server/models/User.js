const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// salt가 몇글자인지
const saltRound = 10;   // Salt를 이용해서 비밀번호 암호화.

// jsonwebtoken 가져옴
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: 
    {
        type : String,
        maxlength : 50
    },
    email:
    {
        type : String,
        trim : true,
        unique : 1
    },
    password:
    {
        type : String,
        minlength : 5
    },
    lastname:
    {
        type : String,
        maxlength : 50
    },
    role:
    {
        type : Number,
        default : 0
    },
    image:{type:String},
    token : 
    {
        type : String
    },
    tokenExp:
    {
        type : Number
    }
});

userSchema.pre('save', function(next){
    
    // 비밀 번호를 암호화 시킨다.

    var user = this;


    if(user.isModified('password'))
    {
        // genSalt. salt rounds 필요.
        bcrypt.genSalt(saltRound, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });

    }
    else
    {
        next();
    }   
    
});

// comparePassword 함수 작성                  비밀번호와 콜백함수
userSchema.methods.comparePassword = function(plainPassword, cb)
{
    // userschema의 this
    // plainPassword TestPW  암호화된 비밀 번호 : $2b$10$H9xU7IteLk/r6.v2dTmQPOU4XeE97mOVAnuZ1h63uuukG/use0iT6 
    
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {   
          
        if(err) return cb(err);
        // 에러는 없고 비밀번호는 같다. true ==> index.js의 user.compareP 로 이동
        cb(null, isMatch);
    });
};
// index.js의 user.generateToken((err, user)... 와 연결
userSchema.methods.generateToken = function(cb) 
{
    // es5 문법을 사용하고 있기에 user = this 받아옴
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    // user._id + 'secretToken = token
    // plaintext로 보내기위해 toHexString 사용
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
}

userSchema.statics.findByToken = function( token, cb) {
    var user = this;

    // 토큰을 디코드 한다.
    // jsonwebtoken 의 verify 사용
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온
        // TOken과 데이터베이스에 보관된 토큰이 일치하는지 확인.

        // findOne은 MongoDB의 메소드
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };