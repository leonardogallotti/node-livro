var http = require('http');


//configurando o caminho atraves de um JSON
var configuracoes = {
	hostname: 'localhost',
	port:3000,
	path:'/livros',
	//preparo o servidor p/ aceitar aplicação em JSON ou HMTL(Content negotiation)
	headers: {
		'Accept': 'text/html'
	}
}


http.get(configuracoes, function(res){        
        console.log(res.statusCode);
	         res.on('data', function(body){
	           	 console.log('Corpo:' + body);
	         }) ;

});