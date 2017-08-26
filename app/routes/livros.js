module.exports = function(app){
	
	var listaLivros =  function(req,res,next){
	   //estou invocando porque o module.export do arquivo connectionFactory esta chamando uma função
	   //o express cria o caminho(pastas) como se fosse um "objeto" p/ agente percorrer e invocar a função
	   var connection = app.infra.connectionFactory();
	   //o 'new' cria um novo contexto so p/ livros banco, sendo assim não utiliza o contexto global
	   var livrosDao = new app.infra.LivrosDAO(connection); 

        livrosDao.lista(function(errors, results){
            //se ocorrer algum error vamos informar ao express, atraves do next que passamos como parametro
            if(errors){
              return next(errors);
            }
            
            //estamos formatando p/ exportação de acordo com que definimos no headers(JSON ou HTML)
            res.format({
            	html: function(){
            		res.render('produtos/livro-lista', {lista: results});
	           	},

				json: function(){
					res.json(results);
				}	           		

            });

        });
	    connection.end();
    };



    //pagina principal(listagem HTML) 
	app.get('/livros', listaLivros);




	//Foi criado este tipo listagem em formato JSON, caso precise exportar os dados 
	app.get('/livros/json', function(req,res){	  
	   var connection = app.infra.connectionFactory();
	   var livrosDao = new app.infra.LivrosDAO(connection); 

        livrosDao.lista(function(errors, results){
            res.json(results);
        });
	    connection.end();
    }); 

    

    //carrega pagina de cadastro
	app.get('/livros/cadastro', function(req,res){      
            //temos que passar errosValidacao(que e chamada no if do ejs) vazio, p/ não dar nenhum ao carrega a pagina p/ um novo cadastro
            res.render('produtos/livro-cad', {errosValidacao:{}, livro:{}});       
	    
    });    

    //estou dando tratamento p/ o post que vem da pagina livto-cad.ejs
    app.post('/livros', function(req, res){
       
       //conteudo enviado atraves do formulario pelo express, vem todos os dados da pagina
       var livro = req.body;

       //validação para o campo titulo(não pode ser vazio) e preco() 
       req.assert('titulo','Campo obrigatório').notEmpty();
       req.assert('preco','Formato inválido').isFloat();


       //se o campo titulo estiver vazio ou preço incorreto, cai no validationErros  
       var erros = req.validationErrors();
       
       if(erros){
       	//estamos passando os erros com suas mensagens que especificamos no assert p/ pagina(ejs), em formato JSON
       	//passamos o produto junto com os erros p/ quando explodir um erro na pagina os dados não sejam perdidos e o usuário possa continuar preencher
        // res.render('produtos/livro-cad', {errosValidacao:erros, livro:livro});
            res.format({
               html: function(){
                   //estamos configurando p/ se der error ira retornar o erro 400(bad request) tanto em html qnt em json
                   res.status(400).render('produtos/livro-cad', {errosValidacao:erros, livro:livro});    
               },
               json: function(){
                   res.status(400).json(errors); 
               }
            });
       	 return;
       }

     var connection = app.infra.connectionFactory();	   
	   var livrosDao = new app.infra.LivrosDAO(connection);	

	   livrosDao.salva(livro, function(errors, results){
          
          //após salvar direciono p/ pagina de listagem
          res.redirect('/livros');
          //apos gravar quero que a pagina de cadastro recarregue
          // res.render('livros');

	   });

         connection.end();    	
     });

	

  // Devido ao valor “DELETE" que passamos no parâmetro “_method”, o method-override tratou a requisição 
  // para nós e chamou o método DELETE ao invés do POST original.
  //lembrando que isso e uma maneira que fiz p/ que todos navegadores possam suportar ate os mais antigos
  app.delete('/livros', function(req,res){
         
      var connection = app.infra.connectionFactory();     
      var livrosDao = new app.infra.LivrosDAO(connection); 

      var livroId = req.body.id; 
      
      livrosDao.delete(livroId, function(errors, results){          
          
          if(errors){
            res.status(500).render('erros/500');
            console.log(errors);
          }
          res.redirect('/livros');
      });
         
         connection.end();
    });    




}

