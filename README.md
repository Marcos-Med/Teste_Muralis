# Sistema de Agenda

## 📌 Sobre o Projeto
O **Sistema de Agenda** é uma aplicação web que permite o cadastro de clientes e a gestão de seus respectivos contatos. O sistema conta com uma interface intuitiva desenvolvida em **React com TypeScript** e uma API robusta utilizando **Spring Boot**, com persistência dos dados em um banco relacional **MySQL**.

## 🚀 Tecnologias Utilizadas
### Frontend:
- React
- TypeScript

### Backend:
- Spring Boot
- MySQL
- Java

## 🛠 Funcionalidades
- 📋 **Cadastro de Clientes**: Permite registrar novos clientes com nome, CPF, data de nascimento e endereço(opcional).
- 📞 **Cadastro de Contatos**: Cada cliente pode possuir vários contatos, armazenando informações como telefone e email.
- 📋 **Armazenamento de Contatos**: Cada contato possui id do cliente, valor, tipo e observação(opcional).
- ✏️ **Restrições**: CPF é único no sistema, Nome não pode ser vazio, endereço e observação são opcionais e o restante é obrigatório.
- 🔍 **Pesquisa de Clientes**: Busca rápida por nome ou CPF.
- ✏️ **Edição e Exclusão**: Possibilidade de editar e excluir clientes e contatos.

## 🎯 Como Executar o Projeto
### 🔧 Backend (API Spring Boot)
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-agenda.git
   ```
2. Acesse a pasta do backend:
   ```bash
   cd back-end
   ```
3. Configure o banco de dados MySQL no arquivo `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/sistema_agenda
   spring.datasource.username=root
   spring.datasource.password=sua_senha
   ```
4. Execute o projeto:
   ```bash
   mvn spring-boot:run
   ```

### 🌐 Frontend (React + TypeScript)
1. Acesse a pasta do frontend:
   ```bash
   cd CRUD
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm run dev
   ```

### Configurando o MySQL
1. Acesse a pasta do script SQL:
   ```bash
   cd Scripts
   ```
2. Rode o arquivo no MySQL WorkBench:
    ```bash
   script.sql
   ```
3. Banco de dados configurado

## 🗄 Estrutura Básica do Projeto
```
/sistema-agenda
│── back-end/api  # API Spring Boot
│   ├── src/main/java/tech/calendar/api/
│   ├── src/main/resources/application.properties
│   ├── pom.xml  # Dependências do Maven
│── frontend/  # Interface React
│   ├── src/
│   │   ├── components/
|   |   |── config
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── libs/
│   ├── package.json
│   ├── tsconfig.json
│── README.md
```
# Endpoints da API

Esta API gerencia clientes e seus contatos em um sistema de agenda. Abaixo estão listados os endpoints disponíveis.

## **Clientes** (`/clientes`)

### **GET /clientes**
Retorna uma lista de todos os clientes cadastrados.

### **GET /clientes/{id}**
Retorna os detalhes de um cliente específico, com base no seu ID.

### **GET /clientes/nome/{name}**
Retorna uma lista de clientes cujo nome contém o valor informado.

### **GET /clientes/cpf/{cpf}**
Retorna um cliente específico, com base no CPF informado.

### **POST /clientes**
Cadastra um novo cliente no sistema.
- **Body:**
  ```json
  {
    "name": "Nome do Cliente",
    "cpf": "123.456.789-00",
    "date_birth": "2000-01-01",
    "address": "Endereço do Cliente"
  }
  ```

### **PUT /clientes/{id}**
Atualiza os dados de um cliente existente, com base no seu ID.
- **Body:** Mesmo formato do `POST /clientes`.

### **DELETE /clientes/{id}**
Exclui um cliente do sistema, com base no seu ID.

---

## **Contatos** (`/contato`)

### **GET /contato/{client_id}**
Retorna todos os contatos associados a um determinado cliente.

### **GET /contato/by/{id}**
Retorna os detalhes de um contato específico, com base no seu ID.

### **POST /contato**
Adiciona um novo contato para um cliente específico.
- **Body:**
  ```json
  {
    "client_id": 1,
    "type": "email",
    "value": "exemplo@email.com",
    "observation": "Contato principal"
  }
  ```

### **PUT /contato/{id}**
Atualiza um contato existente, com base no seu ID.
- **Body:** Mesmo formato do `POST /contato`.

### **DELETE /contato/{id}**
Exclui um contato do sistema, com base no seu ID.

---

## **Observações**
- Todos os endpoints retornam **200 OK** em caso de sucesso.
- Em caso de erro, podem retornar **400 Bad Request** (requisição inválida) ou **500 Internal Server Error** (erro interno no servidor).
---

Desenvolvido por **Marcos** 🚀

