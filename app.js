var express = require('./config/express')();

express.listen(3000, function(){
	console.log("Servidor funcionando");
});