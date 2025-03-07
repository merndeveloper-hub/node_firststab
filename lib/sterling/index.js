import express from 'express'
import getAccessToken from './auth.js';


const router = express.Router();

router.get("/auth", getAccessToken)


 export default router
