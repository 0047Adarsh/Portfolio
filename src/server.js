import express from "express";
import path from 'path';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/ex', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'example.html'));
});

app.get('/exs', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
