package com.cafelcove.streetfinder.repository;

import java.sql.*;
import com.cafelcove.streetfinder.dto.PositionDTO;

public class GetPositionDAO {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;

    public boolean checkValue(String dbConnectionPage, String dbConnectionId, String dbConnectionPw){
        if(dbConnectionId==null){
            System.out.println("dbId 오류");
            return true;
        } else if(dbConnectionPw==null){
            System.out.println("dbId 오류");
            return true;
        } else if(dbConnectionPage==null){
            System.out.println("dbPage 오류");
            return true;
        } else {
            return false;
        }
    }

    public PositionDTO getPosition(String dbUrl, String dbId, String dbPw){
        PositionDTO data = new PositionDTO();
        if(checkValue(dbUrl, dbId, dbPw)){
            return data;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbUrl, dbId, dbPw);
            stmt = conn.createStatement();
            boolean notSucess=true;
            int count=0;
            while(notSucess&&count<10){
                int id = (int) Math.floor(Math.random()*1000);
                String sql = "select * from Place where id=" + id +";";
                rs = stmt.executeQuery(sql);
                count++;
                if(rs.next()){
                    data.setPlace_id(id);
                    data.setPlace_name(rs.getString(2));
                    data.setLat(Float.parseFloat(rs.getString(3)));
                    data.setLng(Float.parseFloat(rs.getString(4)));
                    notSucess=false;
                }
                rs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
                if(stmt!=null){
                    stmt.close();
                }
                if(rs!=null){
                    rs.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return data;
    }
    
}
