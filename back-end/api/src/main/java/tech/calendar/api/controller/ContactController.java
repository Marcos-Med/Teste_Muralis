package tech.calendar.api.controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

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
import tech.calendar.api.database.Database;
import tech.calendar.api.entity.Contact;
import tech.calendar.api.entity.Inserter;

@RestController
@RequestMapping("/contato") //URL base
@CrossOrigin(origins = "*")
public class ContactController { //Controller para requisições que envolve contatos de cliente
	private Database database;
	
	public ContactController(@Value("${spring.datasource.username}") String user, //parâmetros "user" e "key" definidos em "application.properties"
			@Value("${spring.datasource.password}") String key) {
		database = new Database("jdbc:mysql://localhost:3306/sistema_agenda", user, key); //Cria uma instância para se comunica com o database
	}
	
	private ResponseEntity<List<Contact>> getContacts(String sql){ //retorna uma lista de contatos de acordo com a requisição
		List<Contact> list = new LinkedList<>();
		try(Connection conn = database.connect(); //se conecta ao banco de dados
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);){ //executa a instrução SQL
			while(rs.next()) {
				int id = rs.getInt("id");
				int client_id = rs.getInt("cliente_id");
				String type = rs.getString("tipo");
				String value = rs.getString("valor");
				String observation = rs.getString("observacao");
				list.add(new Contact(id, client_id, type, value, observation));
			}
			return ResponseEntity.ok(list); //retorna a lista com sucesso
		}
		catch(SQLException e) {
			printError(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	private void printError(SQLException e) { //imprime uma mensagem de erro
		System.out.println("Falha ao interagir com o banco de dados: " + e.getMessage());
	}
	
	
	private ResponseEntity<String> executeUpdateSQL(String sql){ //executa instruções SQL que altera o banco de dados (INSERT, UPDATE, DELETE)
		try(Connection conn = database.connect(); //se conecta ao banco de dados
			Statement stmt = conn.createStatement();){
			int rowsAffected = stmt.executeUpdate(sql); //executa a instrução SQL
			String response;
			if(rowsAffected > 0) {
				response = "Operação bem sucedida!";
				return ResponseEntity.ok(response); //retorna sucesso
			}
			else {
				response = "Não foi possível realizar a operação.";
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); //houve erro na instrução SQL
			}
		}
		catch(SQLException e) {
			printError(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@GetMapping("/{client_id}")
	public ResponseEntity<List<Contact>> getContactsByClient(@PathVariable int client_id){ //retorna os contatos de um cliente
		String sql = "SELECT Contato.id, cliente_id, tipo, valor, observacao FROM " +
						"Cliente JOIN Contato ON Cliente.id = cliente_id WHERE cliente_id = " +
							client_id + ";";
		return getContacts(sql);	
	}
	
	@GetMapping("/by/{id}")
	public ResponseEntity<List<Contact>> getContact(@PathVariable int id){ //retorna um contato específico
		String sql = "SELECT * FROM Contato WHERE id = " + id + ";";
		return getContacts(sql);	
	}
	
	@PostMapping()
	public ResponseEntity<String> insertContact(@RequestBody Contact contact){ //adiciona um contato para um determinado cliente
		String sql = "INSERT INTO Contato (cliente_id, tipo, valor, observacao) VALUES (" +
						contact.getClientId() + ", " + Inserter.forInsert(contact.getType()) + ", " + 
						Inserter.forInsert(contact.getValue()) + ", " + Inserter.forInsert(contact.getObservation()) + ");";
		return executeUpdateSQL(sql);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateContact(@PathVariable int id, @RequestBody Contact contact){ //atualiza um contato
		String sql = "UPDATE Contato SET cliente_id = " + contact.getClientId() + ", tipo = " +
						Inserter.forInsert(contact.getType()) + ", valor = " + Inserter.forInsert(contact.getValue()) + ", observacao = "
							+ Inserter.forInsert(contact.getObservation()) + " WHERE id = " + id + ";";
		return executeUpdateSQL(sql);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteContact(@PathVariable int id){ //exclui um contato
		String sql = "DELETE FROM Contato WHERE id = " + id + ";";
		return executeUpdateSQL(sql);
	}
}
