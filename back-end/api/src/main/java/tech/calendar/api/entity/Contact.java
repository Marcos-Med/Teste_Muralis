package tech.calendar.api.entity;

public class Contact { //Modela a entidade Contato do banco de dados
	private int id; // id
	private int client_id; // id do cliente
	private String type; // tipo de contato
	private String value; // valor do contato 
	private String observation; //observação
	
	public Contact(int id, int client_id, String type, String value, String observation) {
		this.id = id;
		this.client_id = client_id;
		this.type = type;
		this.value = value;
		this.observation = observation;
	}
	
	public int getId() {
		return id;
	}
	
	public int getClientId() {
		return client_id;
	}
	
	public String getType() {
		return type;
	}
	
	public String getValue() {
		return value;
	}
	
	public String getObservation() {
		return observation;
	}
}
