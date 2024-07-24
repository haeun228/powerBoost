require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('./models/index');

const SECRET_KEY = process.env.SECRET_KEY;

// 토큰 발급
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    SECRET_KEY,
    { expiresIn: "10m" }
  );
};

// const generateRefreshToken = () => {
//   return jwt.sign(
//     {},
//     SECRET_KEY,
//     { expiresIn: "1d" }
//   );
// };

// 유효한 토큰인지 검증
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message
    };
  }
};

// const verifyRefreshToken = async (token) => {
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await User.findOne({ where: { userId: decoded.id } });
//     if (user) {
//       return {
//         ok: true,
//         id: decoded.id
//       };
//     } else {
//       return {
//         ok: false,
//         message: "Invalid user",
//       };
//     }
//   } catch (err) {
//     return {
//       ok: false,
//       message: err.message,
//     };
//   }
// };

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.status(401).send({ message: 'You have to login first!' });

  const result = verifyAccessToken(token);
  if (result.ok) {
    req.userId = result.id;

    const newToken = generateAccessToken(result.id);
    res.cookie('accessToken', newToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 10*60*1000
    });
    next();
  } else {
    res.status(403).send({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  authenticateToken
};