const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=nodeJS
// Route Params = /curso/2
// Request Body = { nome: 'nodejs', tipo: 'backend'}


const curso = ['Node js', 'javaScript', 'React Native'];

server.get('/curso', (req,res)=>{
    return res.json(curso);
})


server.get('/curso/:index', (req, res) =>{
    const {index} = req.params;

    return res.json(curso[index]);
})
//Criando novo 
server.post('/curso',(req, res)=>{
    const {name} = req.body;
    curso.push(name);

    return res.json(curso);
});

//Atualizando 
server.put('/curso/:index', (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;

    curso [index] = name;
    return res.json(curso);
});
//Excluindo algo
server.delete('/curso/:index', (req, res) =>{
    const  {index} =req.params; 
    curso.splice(index, 1)
    return res.send();
})

server.listen(3000);

