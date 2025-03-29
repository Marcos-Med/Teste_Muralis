package tech.calendar.api.entity;

public class Inserter {
	public static String forInsert(String feature) { //método usado para inserir strings 
		String response = feature;						// nas consultas SQL
		if(feature != null) response = "\"" + feature + "\"";
		return response;
	}
}
