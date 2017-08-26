module.exports = function(app){	

    //rota para a chamada do index, tela inicial
	app.get('/', function(req,res){

	   var connection = app.infra.connectionFactory();
	   
	   var livrosDao = new app.infra.LivrosDAO(connection); 

	   livrosDao.lista(function(errors, results){
               res.render('home/index');
	   });
        connection.end();
	});


}