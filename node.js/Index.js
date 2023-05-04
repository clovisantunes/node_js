const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=nodeJS
// Route Params = /curso/2
// Request Body = { nome: 'nodejs', tipo: 'backend'}


const curso = ['Node js', 'javaScript', 'React Native'];

//Middleware Global
server.use((req, res, next)=> {
    console.log(`URL chamada ${req.url}`)

    return next();
});


function checkCurso(req,res, next){
    if(!req.body.name){
        return res.status(400).json({error: "nome do curso obrigatorio"});
    }
    return next();
}

function checkIndexCurso(req,res,next){
    const cursos=curso[req.params.indes]
    if(!cursos){
    return res.status(400).json({error: "curso não existe"});
    }
    return next();
}

server.get('/curso', (req,res)=>{
    return res.json(curso);
})


server.get('/curso/:index',checkIndexCurso, (req, res) =>{
    const {index} = req.params;

    return res.json(curso[index]);
})
//Criando novo 
server.post('/curso', checkCurso,(req, res)=>{
    const {name} = req.body;
    curso.push(name);

    return res.json(curso);
});

//Atualizando 
server.put('/curso/:index',checkCurso,checkIndexCurso, (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;

    curso [index] = name;
    return res.json(curso);
});
//Excluindo algo
server.delete('/curso/:index',checkIndexCurso, (req, res) =>{
    const  {index} =req.params; 
    curso.splice(index, 1)
    return res.send();
})

server.listen(3000);

