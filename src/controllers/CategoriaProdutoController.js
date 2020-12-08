const db = require('../db/connection')
class CategoriaProdutoController{

    //LISTAR TODOS OS REGISTROS
    index(req,res){
        db.query('SELECT * FROM categoria_produto',(err,result)=>{
            if (err){
              console.log(`Houve um erro ao listar as formas de pagemnto: ${err}`)
            }
          res.render('categoria-produto/listar',{categorias:result.rows})
          })
    }
    create(req,res){
        res.render('categoria-produto/adicionar')
    }
    store(req,res){
        const query = {
            text: 'INSERT INTO categoria_produto(descricao) VALUES ($1)',
            values:[req.body.descricao]
          }
          db.query(query,(err, result)=>{
              if(err){
                  console.log(`Houve um erro ao inserir uma categoria de produto: ${err}`)
              }
              res.redirect('/categoria-produto/listar')
            })                 
    }
    edit(req,res){
        const query = {
            text:'SELECT * FROM categoria_produto WHERE id=$1',
            values:[req.params.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao editar: ${err}`)
            }
            res.render('categoria-produto/editar',{categoria:result.rows[0]})
        })
    }
    update(req,res){
        const dados = req.body
        const query ={
            text: 'UPDATE categoria_produto SET descricao=$1 WHERE id=$2',
            values:[dados.descricao,dados.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
            res.redirect('/categoria-produto/listar')
        })
    }
    delete(req,res){
        const id = req.params.id
        const query = {
            text:'DELETE FROM categoria_produto WHERE id=$1',
            values:[id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao excluir: ${err}`)
                
            }
            res.redirect('/categoria-produto/listar')
        })
    }

}
module.exports = new CategoriaProdutoController()