package tech.calendar.api.entity;

public class Client { //Modela a entidade Cliente do banco de dados
	private int id; //id
	private String name; //nome
	private String cpf; //CPF 
	private String date_birth; //data de nascimento
	private String address; // endereço
	
	public Client(int id, String name, String cpf, String date_birth, String address) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.date_birth = date_birth;
		this.address = address;
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getCPF() {
		return cpf;
	}
	
	public String getDateBirth() {
		return date_birth;
	}
	
	public String getAddress() {
		return address;
	}
}
