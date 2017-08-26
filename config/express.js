var express = require("express");
//carregamento de rotas automatico
var load = require("express-load");
//serve p/ pegar os dados das paginas *.ejs
var bodyParser = require('body-parser');

//recurso do express p/ realizar method delete atraves de uma requisição post, pois alguns navegadores antigos não suportam o metodo DELETE passado pela method do form 
var methodOverride = require('method-override');

//estamos chamando o express-validator que instalamos atraves do comando npm
var expressValidator = require('express-validator');

module.exports = function (){

    var app = express();

	//e preciso definir o engine, no caso estamos usando ejs 
	app.set('view engine', 'ejs');
	//alterando o default da view e especificando um caminho p/ o servidor ir buscar
	app.set('views', './app/views');    
    //urlencoded e quem faz chegar os dados do formulario via post da pagina livro-cad.ejs
    //extended:true -> serve p/ permitir um formulario mais complexo, como dados relacionados
    app.use(bodyParser.urlencoded({extended:true}));    
    //habilitando o bodyParser p/ receber JSON
    app.use(bodyParser.json());
    //habiltando o express-validator
    app.use(expressValidator());   

    //Essa chamada tem que ficar depois do uso do bodyParser
    app.use(methodOverride('_method'));

    //carregamento automatico primeiro da pasta routes, depois da pasta infra p/ app.js
    //especifico onde estão as pastas p/ o express-load fazer o carregamento automatico pasta 'app'
    load('routes', {cwd:'app'})
    	.then('infra')
    	.into(app);        
        
        //criando uma propria middlewares p/ endereço ñ encontrado
        //IMPORTANTE colocar depois do carregamento das rotas para ele não cair sempre nesta pagina de erro em qualquer pagina digitada
        app.use(function(req, res, next){
           res.status(404).render('erros/404');
           next();
        });



        //criando uma propria middlewares p/ imprimir mensgagens de erro do servidor, se vier um error como argumento ele cai aqui
        app.use(function(error, req, res, next){
            //se estiver em produção(cliente), manda mensagem amigavel
            if(process.env.NODE_ENV == 'production'){
                res.status(500).render('erros/500');
                return; 
            }          
           //se não estiver em produção, ou seja, estiver em DEV passamos o erro que vem do servidor p/ tela 
           next(error);
        });
	return app;    

}