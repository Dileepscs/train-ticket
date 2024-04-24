import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InsertPassengerServlet extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		// Retrieve form data
		String passengerNames = request.getParameter("passengerName");
		String genders = request.getParameter("gender");

		String ages = request.getParameter("age");
		String preferences = request.getParameter("preference");

		// Insert passenger details into the database
		boolean success = false;
		Connection conn = null;
		PreparedStatement stmt = null;
		int tcktno = 0;

		try {
			// Establish database connection
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection("jdbc:postgresql://192.168.110.48:5432/plf_training",
					"plf_training_admin", "pff123");

			// Prepare SQL statement
			String sql = "INSERT INTO i2_11passengers (name, gender,age, preference,tcktno) VALUES (?, ?, ?, ?,?)";
			stmt = conn.prepareStatement(sql);

			// Loop through only one passenger and set parameters for the prepared statement

			stmt.setString(1, passengerNames);
			System.out.println(passengerNames);
			stmt.setString(2, genders);
			System.out.println(genders);
			stmt.setInt(3, Integer.parseInt(ages));
			System.out.println(ages);
			stmt.setString(4, preferences);
			System.out.println(preferences);
			stmt.setInt(5, tcktno++);
			// Execute the insertion
			stmt.executeUpdate();

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			out.println("<h3>Error occurred while inserting passenger details.</h3>");
		} finally {
			// Close resources
			try {
				if (stmt != null)
					stmt.close();
				if (conn != null)
					conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			out.close();
		}
	}
}