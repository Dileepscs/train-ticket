package irctc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

@WebServlet(urlPatterns = "/stations")
@SuppressWarnings("serial")
public class Allstation extends HttpServlet {

	public void doGet(HttpServletRequest req, HttpServletResponse res) {
		// class
		ServletContext sc = getServletContext();
		JSONObject jsobj = new JSONObject();

		try {
			Connection conn = Db.connect();
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery("select * from railstations");
			while (rs.next()) {
				jsobj.put(rs.getString(2), rs.getString(3));
				System.out.println(rs.getString(2));
				System.out.println(rs.getString(3));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String s = jsobj.toString();
		PrintWriter pw = null;
		try {
			pw = res.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		pw.write(s);

	}
}
