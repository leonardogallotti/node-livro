//arquivo gerado p/ poder gravar no banco dados que vierem em JSON

var http = require('http');


//configurando o caminho atraves de um JSON
var configuracoes = {
	hostname: 'localhost',
	port:3000,
	path:'/livros',
	method: 'post',
	//preparo o servidor p/ aceitar aplicação em JSON ou HMTL(Content negotiation)
	headers: {
		//aceita dados
		'Accept': 'application/json',
		//envia dados
		'Content-type': 'application/json'
	}
};


var client = http.request(configuracoes, function(res){        
	console.log(res.statusCode);	       
		res.on('data', function(body){
			console.log('Corpo:' + body);
		});
});

//variavel em formato JSON que iremos gravar no banco
var livro = {
	titulo:'Node JS',
	descricao:'Node, Javascript',
	preco: 120
};

//JSON.stringify -> e do JS
//para o servidor aceitar o JSON que estamos passando e necessario configurarr o bodyParser p/ aceitar 
client.end(JSON.stringify(livro));