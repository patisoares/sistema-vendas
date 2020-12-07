const express = require('express')
const nunjucks = require('nunjucks')
const clienteController = require('./src/controllers/ClienteController')

const {db}= require('./src/db/connection')

const app = express()
const port = 3000
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','.html');

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app
}); 

//rotas 

app.get('/',(req,res)=>{
  res.render('index')
})


//ROTAS PARA CATEGORIA DE PRODUTOS
app.get('/categoria-produto/listar',(req,res)=>{
  db.query('SELECT * FROM categoria_produto',(err,result)=>{
    if (err){
      console.log(`Houve um erro ao listar as formas de pagemnto: ${err}`)
    }
  res.render('categoria-produto/listar',{categorias:result.rows})
  })
})

app.get('/categoria-produto/adicionar',(req,res)=>{
  res.render('categoria-produto/adicionar')
})

app.post('/categoria-produto/salvar',(req,res)=>{
  const query = {
    text: 'INSERT INTO categoria_produto(descricao) VALUES ($1)',
    values:[req.body.descricao]
  }
  db.query(query,(err, result)=>{
    console.log(result)
  })
  res.redirect('/categoria-produto/listar')
})


//ROTAS PARA CADASTRO DE CLIENTES

app.get('/cliente/listar',clienteController.index)
app.get('/cliente/adicionar',clienteController.create)
app.post('/cliente/salvar',clienteController.store)
app.get('/cliente/editar/:id',clienteController.edit)
app.post('/cliente/atualizar', clienteController.update)
app.get('/cliente/excluir/:id', clienteController.delete)


//ROTAS PARA FORMA DE PAGAMENTO
app.get('/forma-pagamento/listar',(req,res)=>{
  db.query('SELECT * FROM forma_pagamento',(err,result)=>{
    if (err){
      console.log(`Houve um erro ao listar as formas de pagemnto: ${err}`)
    }
   res.render('forma-pagamento/listar',{pagamentos:result.rows})
  })

})
app.get('/forma-pagamento/adicionar',(req,res)=>{
    res.render('forma-pagamento/adicionar')
})

app.post('/forma-pagamento/salvar',(req,res)=>{
  const query = {
    text: 'INSERT INTO forma_pagamento(descricao) VALUES ($1)',
    values:[req.body.descricao]
  }
  db.query(query,(err, result)=>{
    console.log(result)
  })
  res.redirect('/forma-pagamento/listar')
})



//ROTAS PARA USUARIO
app.get('/usuario/listar',(req,res)=>{
  db.query('SELECT * FROM usuario',(err,result)=>{
    if (err){
      console.log(`Houve um erro ao listar os usuários: ${err}`)
    }
    res.render('usuario/listar',{usuarios:result.rows})
  })

})

app.get('/usuario/adicionar',(req,res)=>{
    res.render('usuario/adicionar')
})

app.post('/usuario/salvar',(req,res)=>{
const query = {
  text: 'INSERT INTO usuario(nome, email,senha) VALUES ($1,$2,$3)',
  values:[req.body.nome,req.body.email,req.body.senha]
}
db.query(query,(err, result)=>{
  console.log(result)
})
res.redirect('/usuario/listar')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})