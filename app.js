const express = require('express')
const nunjucks = require('nunjucks')


const app = express()
const port = 3000
app.use(express.static('public'));
app.set('view engine','.html');

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app
});

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

app.get('/cliente/listar',(req,res)=>{
  let {clientes} = require('./src/db/fakeData')
  res.render('cliente/listar',{cliente:clientes})
})

app.get('/cliente/adicionar',(req,res)=>{
  res.render('cliente/adicionar')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})