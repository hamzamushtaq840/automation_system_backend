import express from 'express';
import { applications, getAllApplications } from '../Controllers/Applications.js';
const router = express.Router();

import { getUser, login, SignUp } from '../Controllers/Auth.js';
import { deleteJob, getAllJobs, getAllJobsForEmployee, getSingleJob, Jobs } from '../Controllers/Jobs.js';
import { updateCompanyProfile } from '../Controllers/Profile.js';
import { deleteResume, getAllResume, getResume, Resume } from '../Controllers/Resume.js';

router.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
  res.send({
    success: '1',
    message: 'This is api working',
  });
});

// LOGIN
router.post('/login', login);
router.post('/signup', SignUp);

//USER DETAILS
router.get('/getUser/:userId', getUser);

//COMPANY
router.post('/jobs', Jobs);
router.get('/getAllJobs/:companyId', getAllJobs);
router.get('/getAllApplications/:jobId', getAllApplications);
router.post('/deleteJobs', deleteJob);
router.get('/getResume/:resumeId', getResume);
router.get('/getSingleJob/:jobId', getSingleJob);
router.post('/updateCompanyProfile', updateCompanyProfile);

//EMPLOYEE
router.get('/getAllJobsForEmployee', getAllJobsForEmployee);
router.post('/resume', Resume);
router.get('/getAllResume/:userId', getAllResume);
router.post('/deleteResume', deleteResume);
router.post('/applications', applications);


export default router;
























// import { authenticateToken } from '../Controllers/AuthenticateToken.js';
// import {getUser, updateUser} from "../Controllers/User.js";
// import { refreshToken } from '../Controllers/AuthenticateToken.js';
// router.post('/emailVerification', EmailVerify);
// router.post('/forgotPassword', ForgotPassword);
// router.post('/forgotPasswordChange',ForgotPasswordChange);
// router.post ("/user",authenticateToken,updateUser);
// router.get("/user",authenticateToken,getUser);
// AUTHENTICATION
// router.get("/isAuthorized",authenticateToken,isAuthorized);
// router.get("/refreshToken/:userId/:quizId",refreshToken);