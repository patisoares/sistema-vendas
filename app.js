const express = require('express')
const nunjucks = require('nunjucks')
const {db} = require('./src/db/connection')

/*db.query('SELECT * FROM cliente', (err.result)=>{
  if (err){
    console.log(`Houve um erro ao conectar: ${err}`)
  }
  console.log(result.rows)
});*/

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
app.get('/categoria-produto/listar',(req,res)=>{
  let {categoriasDeProduto} = require('./src/db/fakeData')
  res.render('categoria-produto/listar',{categorias:categoriasDeProduto})
})
app.get('/categoria-produto/adicionar',(req,res)=>{
  res.render('categoria-produto/adicionar')
})

//ROTAS PARA CADASTRO DE CLIENTES

app.get('/cliente/listar',(req,res)=>{
  db.query('SELECT * FROM cliente', (err,result)=>{
    if(err){
      console.log(`Houve um erro ao listar os clientes: ${err}`)
    }
    res.render('cliente/listar',{clientes:result.rows})
  })
})

app.get('/cliente/adicionar',(req,res)=>{
  res.render('cliente/adicionar')
})

app.post('/cliente/salvar',(req,res)=>{
  const query = {
  text: 'INSERT INTO cliente(nome,cpf) VALUES ($1,$2)',
  values:[req.body.nome,req.body.cpf]
  }
  db.query(query,(err,result)=>{
    console.log(result)
  })
  res.redirect('/cliente/listar')
})

//rotas para forma de pagamento
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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})