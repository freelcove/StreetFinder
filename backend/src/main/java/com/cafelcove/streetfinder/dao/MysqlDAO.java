package com.cafelcove.streetfinder.dao;

import java.sql.*;
import java.util.ArrayList;

import com.cafelcove.streetfinder.dto.TotalDTO;

    
    
public class MysqlDAO {

    private Connection conn = null;
    private Statement stmt = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;

    public void write(ArrayList<TotalDTO> data){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(
                  "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY",
                  "1lp3b3onr14l1nlmnojc",
                  "pscale_pw_b4BW3mCETVdgrUvMQpBn1Es2ZhfFjRGbs323uz9Ybew");
            String sql = "insert into place";
            sql="insert into ";
            pstmt = conn.prepareStatement(sql);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
    }


    public String read(){
        String result="";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(
                  "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY",
                  "1lp3b3onr14l1nlmnojc",
                  "pscale_pw_b4BW3mCETVdgrUvMQpBn1Es2ZhfFjRGbs323uz9Ybew");
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from testdata");
            rs.next();
            result+= rs.getString("name");
            result+= " | " + rs.getString("gender");
            } catch (Exception e) {
            e.printStackTrace();
        } finally { 
            try {
                conn.close();
                stmt.close();
                rs.close();
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
}
