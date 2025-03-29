# Sistema de Agenda

## 📌 Sobre o Projeto
O **Sistema de Agenda** é uma aplicação web que permite o cadastro de clientes e a gestão de seus respectivos contatos. O sistema conta com uma interface intuitiva desenvolvida em **React com TypeScript** e uma API robusta utilizando **Spring Boot**, com persistência dos dados em um banco relacional **MySQL**.

## 🚀 Tecnologias Utilizadas
### Frontend:
- React
- TypeScript
- Material-UI
- Axios
- React Router DOM

### Backend:
- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- Hibernate

## 🛠 Funcionalidades
- 📋 **Cadastro de Clientes**: Permite registrar novos clientes com nome, CPF, data de nascimento e endereço.
- 📞 **Cadastro de Contatos**: Cada cliente pode possuir vários contatos, armazenando informações como telefone e email.
- 🔍 **Pesquisa de Clientes**: Busca rápida por nome ou CPF.
- ✏️ **Edição e Exclusão**: Possibilidade de editar e excluir clientes e contatos.
- 🔐 **Segurança**: Implementa autenticação e autorização com Spring Security.

## 🎯 Como Executar o Projeto
### 🔧 Backend (API Spring Boot)
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-agenda.git
   ```
2. Acesse a pasta do backend:
   ```bash
   cd backend
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
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm run dev
   ```

## 🗄 Estrutura do Projeto
```
/sistema-agenda
│── backend/  # API Spring Boot
│   ├── src/main/java/com/example/sistemaagenda
│   ├── src/main/resources/application.properties
│   ├── pom.xml  # Dependências do Maven
│── frontend/  # Interface React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   ├── package.json
│   ├── tsconfig.json
│── README.md
```

## 📌 Melhorias Futuras
- 📅 Agendamento de compromissos entre clientes
- 📊 Dashboard com estatísticas de uso
- 📩 Integração com envio de emails

## 📜 Licença
Este projeto é de uso livre e pode ser modificado conforme necessidade.

---
Desenvolvido com ❤️ por **Marcos** 🚀

