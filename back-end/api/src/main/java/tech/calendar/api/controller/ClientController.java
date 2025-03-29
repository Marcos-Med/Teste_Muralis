package tech.calendar.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;
import tech.calendar.api.database.Database;
import tech.calendar.api.entity.*;

@RestController
@RequestMapping("/clientes") //Url base do endpoint
@CrossOrigin(origins = "*")
public class ClientController { //Controller para todas as requisições referentes a clientes
	
	private Database database;
	
	public ClientController(@Value("${spring.datasource.username}") String user, //parâmetros "user" e "key" definidos em "application.properties"
			@Value("${spring.datasource.password}") String key) {
		database = new Database("jdbc:mysql://localhost:3306/sistema_agenda", user, key); //Cria uma instância para se comunica com o database
	}
	
	private ResponseEntity<List<Client>> getClients(String sql){ //retorna lista de clientes de acordo com a consulta
		List<Client> list = new LinkedList<>();
		try(Connection conn = database.connect(); //se conecta ao db
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);){ //executa consulta
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("nome");
				String cpf = rs.getString("cpf");
				String date_birth = rs.getString("data_nascimento");
				String address = rs.getString("endereco");
				list.add(new Client(id, name, cpf, date_birth, address)); //adiciona a lista de clientes
			}
			return ResponseEntity.ok(list); //retorna lista com sucesso
		}
		catch(SQLException e) { 
			printError(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	private void printError(SQLException e) { //Imprime mensagens de erro
		System.out.println("Falha ao interagir com o banco de dados: " + e.getMessage());
	}
	
	@GetMapping
	public ResponseEntity<List<Client>> getListClients(){ //endpoint que retorna a lista completa de clientes
		String sql = "SELECT * FROM Cliente;";
		return getClients(sql);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<List<Client>> getClientByID(@PathVariable int id){ //endpoint que retorna o cliente pelo Id
		String sql = "SELECT * FROM Cliente WHERE id = " + id + ";";
		return getClients(sql);
	}
	
	@GetMapping("/nome/{name}")
	public ResponseEntity<List<Client>> getClientByName(@PathVariable String name){ //endpoint que realiza a pesquisa pelo cliente através do nome
		String sql = "SELECT * FROM Cliente WHERE nome LIKE \"%" + name + "%\";";
		return getClients(sql);
	}
	
	@GetMapping("/cpf/{cpf}")
	public ResponseEntity<List<Client>> getClientByCPF(@PathVariable String cpf){ //endpoint que realiza a pesquisa pelo cliente através do cpf
		String sql = "SELECT * FROM Cliente WHERE cpf =\"" + cpf + "\";";
		return getClients(sql);
	}
	
	@PostMapping
	public ResponseEntity<String> insertClient(@RequestBody Client client){ //endpoint para inserir um cliente ao banco de dados
		//rejeita requisição, caso o nome seja um espaço em branco
		if(client.getName() != null && client.getName().isBlank()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome está vazio. Por favor, preencha corretamente");
		String sql = "INSERT INTO Cliente (nome, cpf, data_nascimento, endereco) VALUES " +
						"(" + Inserter.forInsert(client.getName()) + ", " + Inserter.forInsert(client.getCPF()) + ", " +
							Inserter.forInsert(client.getDateBirth()) + ", " + Inserter.forInsert(client.getAddress()) + ");";
		return this.executeUpdateSQL(sql);
	}
	
	private ResponseEntity<String> executeUpdateSQL(String sql){ //executa instruções SQL que altera o banco de dados (INSERT, UPDATE, DELETE)
		try(Connection conn = database.connect(); //se conecta ao banco de dados
			Statement stmt = conn.createStatement();){
			int rowsAffected = stmt.executeUpdate(sql); //executa a instrução SQL
			String response;
			if(rowsAffected > 0) {
				response = "Operação bem sucedida!";
				return ResponseEntity.ok(response); //alteração feita com sucesso
			}
			else {
				response = "Não foi possível realizar a operação.";
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); //erro na instrução
			}
		}
		catch(SQLException e) {
			printError(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateClient(@PathVariable int id, @RequestBody Client client){ //atualiza um cliente
		//rejeita requisição, caso o nome seja um espaço em branco
		if(client.getName() != null && client.getName().isBlank()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome está vazio. Por favor, preencha corretamente");
		String sql = "UPDATE Cliente SET nome = " + Inserter.forInsert(client.getName()) + ", cpf = " + Inserter.forInsert(client.getCPF()) +
						", data_nascimento = " + Inserter.forInsert(client.getDateBirth()) + ", endereco = " + Inserter.forInsert(client.getAddress())
						+ " WHERE id = " + id + ";";
		return this.executeUpdateSQL(sql);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteClient(@PathVariable int id){ //exclui um cliente
		String sql = "DELETE FROM Cliente WHERE id = " + id + ";";
		return this.executeUpdateSQL(sql);
	}
	
}
