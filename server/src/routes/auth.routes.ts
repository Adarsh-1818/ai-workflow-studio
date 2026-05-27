import express from 'express';

import {
 
  login,
  register
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/login', (req, res, next) => {
    console.log("LOGIN ROUTE HIT");
    next();
  }, login);
  
export default router;