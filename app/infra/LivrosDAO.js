
//função(construtora) que funciona como uma classe
function LivrosDAO(connection){
  this._connection = connection;
}

//estamos adicionando a propriedade lista atraves do prototype
//passamos callback como parametro da função para não travar o servidor de receber outras requisições enquanto ele executa a query, com isso temos varias requisições sendo atendidas com um processador so por exemplo(assíncrono).
LivrosDAO.prototype.lista = function(callback) {
	this._connection.query('select * from livro', callback);
};

//livro esta vindo em formato JSON, vamos alimentar atraves do comando 'set?''
LivrosDAO.prototype.salva = function(livro, callback) {
	this._connection.query('insert into livro set ?', livro, callback);
};


LivrosDAO.prototype.delete = function(livroId, callback) {
	this._connection.query('delete from livro where id= ?', [livroId], callback);
};




module.exports = function(){
	return LivrosDAO;
}