

-- Categoria
create TABLE categoria_produto(
	id serial PRIMARY key,
	descricao varchar(100) not null

);

-- usuario
CREATE TABLE usuario(
	id serial PRIMARY key,
	nome VARCHAR(100) not null,
	email VARCHAR(100) not null,
	senha VARCHAR(100) not null
);

--cliente
CREATE TABLE cliente(
	id serial PRIMARY key,
	nome varchar(100) not null,
	cpf varchar(11) not null
	
	
);

-- forma de pagamento
create TABLE forma_pagamento(
	id serial PRIMARY key,
	descricao varchar(100) not null
);

--Produto
create TABLE produto(
	id serial PRIMARY key,
	descricao varchar(100) not null,
	preco_custo DECIMAL not null,
	preco_venda DECIMAL not null,
	categoria_produto integer not null,
	foreign key(categoria_produto) REFERENCES categoria_produto (id)
);

--Vendas
CREATE TABLE venda(
	id serial PRIMARY key,
	dataVenda DATE not null,
	status char,
	forma_pagamento integer,
	foreign key(forma_pagamento) REFERENCES forma_pagamento (id),
	usuario_id integer,
	foreign key(usuario_id) REFERENCES usuario (id),
	cliente_id integer,
	foreign key(cliente_id) REFERENCES cliente (id)
);

--Itens vendas
CREATE TABLE itens_venda(
	quantidade decimal not null,
	valor_unitario decimal not null,
	produto_id integer not null,
	foreign key(produto_id) REFERENCES produto (id),
	venda_id integer not null,
	foreign key(venda_id) REFERENCES venda (id)
	
);