const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져옴.

    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다.

    User.findByToken(token, (err, user) => {

        if(err) throw err;

        // 유저가 없을 시. 인증 false, error true
        if(!user) return res.json({ isAuth: false, error: true });

        // 유저가 있을 경우
        // req에 넣어줌으로 인해서 index.js로 넘어가게 할 수 있음.
        req.token = token;
        req.user = user;

        next();     // 미들웨어에서 넘어갈 수 있게.
    });
    

    // 유저가 있으면 인증 OKAY

    // 유저가 없으면 인증 NO
};

module.exports = {auth};