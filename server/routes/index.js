import express from 'express';
import account from './account';
import memo from './memo';
import blog from './blog';
import insta from './insta';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);
router.use('/insta', insta);
router.use('/blog', blog);

export default router;
