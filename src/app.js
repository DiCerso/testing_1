import express from  'express';

const app = express();

app.use(express.json());//coloco esto para transforme todo lo que le llegue a formato json

app.get('/ping', (req, res) => {
    res.send("pong");
})


app.get('/task', (req, res) => {
    res.json([]);
})

app.post('/tasks', (req, res) => {
    const {title, description} = req.body;
    if(!title || !description){
        return res.sendStatus(400);
    }
    res.json({
        title,
        description,
        id: 1
    });
})



export default app;