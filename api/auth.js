import dotenv from "dotenv";
import { Router } from 'express';

import User from '../models/user';
import { sign } from 'jsonwebtoken';

dotenv.config();
const auth = Router();

auth.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email }});
  if(!userData){
    await User.create({
      email,
      password,
    });
    return res.status(200).json({
      data: await User.findOne({ 
        attributes: ['id'],
        where: { email },
      })
    });
  }
  res.status(404).json({
    error: "User already exist",
  });
});

auth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email }});
  if(userData && userData.password == password){
    const token = sign({
      id: userData.id,
      name: req.body.name,
    }, process.env.JWT_SECRET, {
      expiresIn: '10m',
      issuer: 'JWT_study',
    });
    return res.status(200).json({
      data:{
        user: userData.id,
        token,
      }
    });
  }
  res.status(404).json({
    error: "User not exist",
  })
})

module.exports = auth