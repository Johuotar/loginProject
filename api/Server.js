import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const secret = "secret123";

await mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', console.log);

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000', 'https://aurawaveclient.fly.dev'],
}));

app.get('/', (req, res) => {
    res.send('loginProject server is running ok');
});

app.get('/user', (req, res) => {
    if (!req.cookies.token) {
        return res.json({});
    }
    const payload = jwt.verify(req.cookies.token, secret)
    User.findById(payload.id)
        .then(userInfo => {
            if (!userInfo) {
                return res.json({});
            }
            //deprecated in express 5
            res.json({id:userInfo._id,email:userInfo.email});
        })
});

app.post('/register', (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({password:hashedPassword,email});
    user.save().then(userInfo => {
        console.log(userInfo); //Log Id, email and password
        //Send token and response inside a cookie with jsonwebtoken library
        jwt.sign({id:userInfo._id, email:userInfo.email}, secret, (err,token) => {
            if (err) { //If there is error, log it
                console.log(err)
                res.sendStatus(500);
            }
            else {
                res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
            }
        })
    });
});

app.post('/login', (req, res) => {
    const {email,password} = req.body;
    User.findOne({email})
      .then(userInfo => {
        if (!userInfo) {
          return res.json({});
        }
        const passOk = bcrypt.compareSync(password, userInfo.password);
        if (passOk) {
          jwt.sign({id:userInfo._id,email},secret, (err,token) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
            }
          });
        } else {
          res.sendStatus(401);
        }
      })
  });

app.post('/logout', (req, res) => {
    res.cookie('token', '').send();
});


app.listen(4000);