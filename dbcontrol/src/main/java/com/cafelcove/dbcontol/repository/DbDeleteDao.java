package com.cafelcove.dbcontol.repository;

import java.sql.*;

import org.springframework.stereotype.Component;

import com.cafelcove.dbcontol.dto.ApiInfo;

    
@Component
public class DbDeleteDao {

    private Connection conn = null;
    private PreparedStatement pstmt = null;


    private String dbConnectionPage = ApiInfo.jdbc_page;
    private String dbConnectionId = ApiInfo.jdbc_id;
    private String dbConnectionPw = ApiInfo.jdbc_pw;

    public boolean checkValue(){
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

    //places 데이터베이스 Delete(Id 기준)
    public void deletePlace(int id){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

            String sql = "";
            sql="delete from Place where id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            pstmt.executeUpdate();

        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
                if(pstmt!=null){
                    pstmt.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }

    //Category 데이터베이스 delete
    public void deleteCategory(int id){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

            String sql = "";
            sql="delete from Category where id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            pstmt.executeUpdate();

        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
                if(pstmt!=null){
                    pstmt.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }

    //Subcategory 데이터베이스 delete
    public void deleteSubcategory(int id){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

            String sql = "";
            sql="delete from Subcategory where id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            pstmt.executeUpdate();

        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
                if(pstmt!=null){
                    pstmt.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }

    //Cities 데이터베이스 delete
    public void deleteCity(int id){
        if(checkValue()){
            return;
        }
       try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

            String sql = "";
            sql="delete from City where id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            pstmt.executeUpdate();

        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
                if(pstmt!=null){
                    pstmt.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }
}
