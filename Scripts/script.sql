CREATE DATABASE sistema_agenda; /*Criando o banco de dados "sistema_agenda"*/

USE sistema_agenda; /*Seleciona o banco de dados para uso*/

CREATE TABLE Cliente ( /*Cria a tabela de clientes*/
	id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE Contato (/*Cria a tabela de contato dos clientes*/
	id INT AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor VARCHAR(100) NOT NULL,
    observacao VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id) /*Cada contato pertence a um cliente*/
);

ALTER TABLE Cliente ADD CONSTRAINT cpf_unico UNIQUE(cpf); /*Não permite valores de cpf repetidos*/

ALTER TABLE Contato DROP FOREIGN KEY contato_ibfk_1;

ALTER TABLE Contato ADD CONSTRAINT fk_contato FOREIGN KEY (cliente_id) REFERENCES Cliente(id)
ON DELETE CASCADE; /*Quando um cliente for excluído, os contatos também serão*/

/*Inserção de dados na tabela Cliente*/
INSERT INTO Cliente (nome, cpf, data_nascimento, endereco) VALUES
('João Silva', '123.456.789-01', '1990-05-15', 'Rua das Palmeiras, 123'),
('Maria Oliveira', '987.654.321-00', '1985-10-22', 'Avenida Central, 456'),
('Carlos Souza', '321.654.987-02', '1993-07-30', 'Praça do Sol, 789'),
('Ana Costa', '741.852.963-03', '1988-03-12', 'Rua das Rosas, 321'),
('Fernanda Lima', '159.357.486-04', '1995-12-05', 'Alameda das Flores, 258');

/*Inserção de dados na tabela Contato*/
INSERT INTO Contato (cliente_id, tipo, valor, observacao) VALUES
(1, 'E-mail', 'joao.silva@email.com', 'E-mail principal'),
(1, 'Telefone', '(11) 91234-5678', 'WhatsApp disponível'),
(2, 'E-mail', 'maria.oliveira@email.com', 'E-mail pessoal'),
(3, 'Telefone', '(21) 99876-5432', 'Celular pessoal'),
(3, 'E-mail', 'carlos.souza@email.com', 'E-mail corporativo'),
(4, 'Telefone', '(31) 93456-7890', 'Telefone fixo'),
(5, 'E-mail', 'fernanda.lima@email.com', 'Contato preferencial');
