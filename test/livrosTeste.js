//mocha executa de maneira assicrona(callback)

var express = require('../config/express')();
//basta passar as configurações que estão no express, que ele simula tudo sem a necessidade de esta com o servidor rodando
var request = require('supertest')(express);

query para ser executada no beforeEach
function limpaTabela(done){
    var conn = express.infra.connectionFactory(); 
    conn.query("delete from livro", function(error, resul){
        //se não deu erro informo que finalizou o beforeEach, 'done'(callback) e uma função de finalização do mocha
        if(!error){
        	done();
        }
    });
}


describe('LivrosController', function(){
    //usamos beforeEach p/ sempre antes de iniciar nossa bateria de testes limpar todos os dados do banco, para não deixar nosso banco de teste poluido    
	//quando tivermos tabela relacionadas, utilizar biblioteca node-databse-cleaner
	beforeEach(function(done){
             limpaTabela(done);
	});


	it('#Listagem JSON', function(done){
	   //vamos testar se esta listando no formato JSON, passando a rota ja que temos o express		
	    request.get('/livros')       
	        //estamos configurando o cabeçalho(headers) p/ que o Accept seja um application/json
	        .set('Accept', 'application/json')	       
	        //estamos esperando que venha em formato JSON
	        .expect('Content-Type', /json/)
	        //estamos esperando que a resposta seja OK(200) e informando ao mocha que foi finalizado(done).
	        //OBS: se não estiver usando o supertest, e necessario esta executando a aplicação "nodemon app.js"
	        .expect(200, done);
	});


	it('#Cadastro de novo livro com dados invalidos', function(done){            
            request.post('/livros')
                //lembrando que titulo e obrigatório, logo como não estamos passando ira explodir erro 400(bad request)
                .send({titulo: "", descricao: "teste"})	   
                .expect(400,done);

	});

	it('#Cadastro de novo livro com dados válidos', function(done){            
            request.post('/livros')
                .send({titulo: "PL SQL 3",preco: 100.89, descricao: "programação no oracle"})	   
                .expect(302,done);

	});







});