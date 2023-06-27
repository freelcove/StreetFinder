package com.cafelcove.streetfinder.repository;

import java.sql.*;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cafelcove.streetfinder.dto.PositionDTO;

@Repository
public class GetPositionDAO {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;

    // @Value("${spring.datasource.url}")
    // private String dbUrl;
    // @Value("${spring.datasource.username}")
    // private String dbId;
    // @Value("${spring.datasource.password}")
    // private String dbPw;




    // public PositionDTO getPosition(){
    //     PositionDTO data = new PositionDTO();
    //     System.out.println(dbUrl);
    //     System.out.println(dbId);
    //     System.out.println(dbPw);
    //     try {
    //         Class.forName("com.mysql.cj.jdbc.Driver");
    //         conn = DriverManager.getConnection(dbUrl, dbId, dbPw);
    //         stmt = conn.createStatement();
    //         boolean notSucess=true;
    //         int count=0;
    //         while(notSucess&&count<10){
    //             int id = (int) Math.floor(Math.random()*1000);
    //             String sql = "select * from Place where id=" + id +";";
    //             rs = stmt.executeQuery(sql);
    //             count++;
    //             if(rs.next()){
    //                 data.setPlace_id(id);
    //                 data.setPlace_name(rs.getString(2));
    //                 data.setLat(Float.parseFloat(rs.getString(3)));
    //                 data.setLng(Float.parseFloat(rs.getString(4)));
    //                 data.setVisits(Integer.parseInt(rs.getString(11)));
    //                 notSucess=false;
    //             }
    //             rs.close();
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     } finally {
    //         try {
    //             if(rs!=null){
    //                 rs.close();
    //             }
    //             if(stmt!=null){
    //                 stmt.close();
    //             }
    //             if(conn!=null){
    //                 conn.close();
    //             }
    //         } catch (Exception e2) {
    //             e2.printStackTrace();
    //         }
    //     }
    //     return data;
    // }
    
    // public PositionDTO getPosition(List<PositionDTO> arrData){
    //     PositionDTO data = new PositionDTO();
    //     try {
    //         Class.forName("com.mysql.cj.jdbc.Driver");
    //         conn = DriverManager.getConnection(dbUrl, dbId, dbPw);
    //         stmt = conn.createStatement();
    //         boolean notSucess=true;
    //         int count=0;
    //         while(notSucess&&count<10){
    //             int id=0;
    //             boolean checkDubpl=true;
    //             while (checkDubpl) {
    //                 id = (int) Math.floor(Math.random()*1000);
    //                 checkDubpl=false;
    //                 for (PositionDTO item : arrData) {
    //                     if(item.getPlace_id()==id){
    //                         checkDubpl=true;
    //                         break;
    //                     }
    //                 }
    //             }
    //             String sql = "select * from Place where id=" + id +";";
    //             rs = stmt.executeQuery(sql);
    //             count++;
    //             if(rs.next()){
    //                 data.setPlace_id(id);
    //                 data.setPlace_name(rs.getString(2));
    //                 data.setLat(Float.parseFloat(rs.getString(3)));
    //                 data.setLng(Float.parseFloat(rs.getString(4)));
    //                 data.setVisits(Integer.parseInt(rs.getString(11)));
    //                 notSucess=false;
    //             }
    //             rs.close();
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     } finally {
    //         try {
    //             if(rs!=null){
    //                 rs.close();
    //             }
    //             if(stmt!=null){
    //                 stmt.close();
    //             }
    //             if(conn!=null){
    //                 conn.close();
    //             }
    //         } catch (Exception e2) {
    //             e2.printStackTrace();
    //         }
    //     }
    //     return data;
    // }

    public PositionDTO getPosition(String dbUrl, String dbId, String dbPw){
        PositionDTO data = new PositionDTO();
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
                    data.setVisits(Integer.parseInt(rs.getString(11)));
                    notSucess=false;
                }
                rs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(rs!=null){
                    rs.close();
                }
                if(stmt!=null){
                    stmt.close();
                }
                if(conn!=null){
                    conn.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return data;
    }

    public PositionDTO getPosition(String dbUrl, String dbId, String dbPw, List<PositionDTO> arrData){
        PositionDTO data = new PositionDTO();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbUrl, dbId, dbPw);
            stmt = conn.createStatement();
            boolean notSucess=true;
            int count=0;
            while(notSucess&&count<10){
                int id=0;
                boolean checkDubpl=true;
                while (checkDubpl) {
                    id = (int) Math.floor(Math.random()*1000);
                    checkDubpl=false;
                    for (PositionDTO item : arrData) {
                        if(item.getPlace_id()==id){
                            checkDubpl=true;
                            break;
                        }
                    }
                }
                String sql = "select * from Place where id=" + id +";";
                rs = stmt.executeQuery(sql);
                count++;
                if(rs.next()){
                    data.setPlace_id(id);
                    data.setPlace_name(rs.getString(2));
                    data.setLat(Float.parseFloat(rs.getString(3)));
                    data.setLng(Float.parseFloat(rs.getString(4)));
                    data.setVisits(Integer.parseInt(rs.getString(11)));
                    notSucess=false;
                }
                rs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(rs!=null){
                    rs.close();
                }
                if(stmt!=null){
                    stmt.close();
                }
                if(conn!=null){
                    conn.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return data;
    }
    
}
