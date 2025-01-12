import express from "express";
import ejs from "ejs";
import {dirname} from 'path';
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));  
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

dotenv.config()

app.get('/',(req,res)=>{
    res.render('index');
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:
    {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

app.post('/contact', (req,res)=>{
    const {name,email,message} = req.body;

    const mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject: `New message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log(error);
            return res.send("Message not sent, please try again later.");
        }
        console.log("Email sent" +info.response);
        res.send('<script>alert("Message received. Thank you!"); window.location.href="/";</script>');
    });

    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
});

app.listen(`${port}`, ()=>{
    console.log(`Server running on port ${port}`);
})

