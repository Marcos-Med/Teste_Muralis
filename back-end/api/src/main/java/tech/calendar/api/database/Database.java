package tech.calendar.api.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database { //classe que encapsula a conexão com o banco de dados
	private String url; //MySQL
	private String user;
	private String key;
	
	public Database(String url, String user, String key) { 
		this.url = url; //"jdbc:mysql://localhost:3306/sistema_agenda"
		this.user = user;
		this.key = key;
	}

	public Connection connect() throws SQLException{ //realiza a conexão	
		return DriverManager.getConnection(url, user, key);
	}
}
