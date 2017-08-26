CREATE DATABASE db_livro;
CREATE DATABASE db_livro_test;



CREATE TABLE livro(id int(18) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                   titulo varchar(60) NOT NULL,
                   descricao varchar(255),
                   preco double);

INSERT INTO LIVRO VALUES(null, 'Use a cabeça', 'Java inciantes', 120.10);
INSERT INTO LIVRO VALUES(null, 'PL/SQL', 'Programação em BD', 100.80);