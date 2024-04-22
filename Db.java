package irctc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Db {

	public static Connection connect() throws ClassNotFoundException, SQLException {
		Class.forName("org.postgresql.Driver");
		String username = "plf_training_admin";
		String password = "pff123";
		String url = "jdbc:postgresql://192.168.110.48:5432/postgres";
		Connection cn = DriverManager.getConnection(url, username, password);
		System.out.println(cn);
		return cn;
	}
}
