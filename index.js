import express from "express";
import ejs from "ejs";
import {dirname} from 'path';
import { fileURLToPath } from "url";

const app = express();
const port = 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));  

app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(`${port}`, ()=>{
    console.log(`Server running on port ${port}`);
})

