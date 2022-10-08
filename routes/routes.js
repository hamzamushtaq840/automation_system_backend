import express from 'express';
const router = express.Router();

import {login,SignUp} from '../Controllers/Auth.js';
// import { authenticateToken } from '../Controllers/AuthenticateToken.js';
// import {getUser, updateUser} from "../Controllers/User.js";
// import { refreshToken } from '../Controllers/AuthenticateToken.js';

router.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
  res.send({
    success: '1',
    message: 'This is api working',
  });
});

// AUTHENTICATION
// router.get("/isAuthorized",authenticateToken,isAuthorized);
// router.get("/refreshToken/:userId/:quizId",refreshToken);

// LOGIN
router.post('/login', login);
router.post('/signup', SignUp);
// router.post('/emailVerification', EmailVerify);
// router.post('/forgotPassword', ForgotPassword);
// router.post('/forgotPasswordChange',ForgotPasswordChange);
// router.post ("/user",authenticateToken,updateUser);
// router.get("/user",authenticateToken,getUser);


export default router;

