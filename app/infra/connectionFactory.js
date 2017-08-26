//a principal ideia e criar bancos separados p/ dev e test, com isso não poluimos o nosso banco de desenvolvimento com dados de test

var mysql = require('mysql');
    
 var connectMySql = function(){ 	
     //process e um objeto definido pelo node onde temos acesso a qualquer dado(arquivo) do nosso projeto
     //estamos informando se o NODE_ENV não vier definido então e para gravar no banco de desenvolvimento
     if(!process.env.NODE_ENV){	
         return mysql.createConnection({
		 host: 'localhost',
		 user:'root',
		 password:'le0405',
		 database:'db_livro'
		 });		 
	  }
      
      //estamos informando se o NODE_ENV vier definido como test então e para gravar no banco de dados
	  //para executar no prompt primeiro devemos 'SET NODE_ENV=test' e depois executar o node normalmente 'node node_modules\mocha\bin\mocha' 
	  if(process.env.NODE_ENV =='test'){	
          return mysql.createConnection({
		  host: 'localhost',
		  user:'root',
		  password:'le0405',
		  database:'db_livro_test'
		  });
	  }
 }; 

    


//criei esta função chamando a função acima p/ quando carregar a aplicação ja não fazer a conexão com o BD direto(wrapper)
module.exports = function(){
    return connectMySql;
}         