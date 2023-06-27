package com.cafelcove.dbcontol.repository;

import java.sql.*;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.cafelcove.dbcontol.dto.ApiInfo;
import com.cafelcove.dbcontol.entity.Category;
import com.cafelcove.dbcontol.entity.City;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.entity.Subcategory;

    
@Component
public class DbReadDao {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;


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

    //places 데이터베이스 Read
    public ArrayList<Place> readPlace(){
        ArrayList<Place> arr = new ArrayList<Place>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            String sql = "select * from Place;";
            rs = stmt.executeQuery(sql);
            while(rs.next()){
                Place data = new Place(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10),rs.getString(11));
                arr.add(data);
            }
        } catch (Exception e3) {
            e3.printStackTrace();
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
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
        return arr;
    }

    public Place readEachPlace(int id){
        Place arr = new Place();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            String sql = "select * from Place where id="+id+";";
            rs = stmt.executeQuery(sql);
            rs.next();
            arr = new Place(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10),rs.getString(11));
            System.out.println(arr.toString());
        } catch (Exception e3) {
            e3.printStackTrace();
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
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
        return arr;
    }

    //Category 데이터베이스 Read
    public ArrayList<Category> readCategory(){
        ArrayList<Category> arr = new ArrayList<Category>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from Category");
            while(rs.next()){
                Category data = new Category(rs.getString(1), rs.getString(2));
                arr.add(data);
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
        return arr;
    }

    //Subcategory 데이터베이스 Read
    public ArrayList<Subcategory> readSubcategory(){
        ArrayList<Subcategory> arr = new ArrayList<Subcategory>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from Subcategory");
            while(rs.next()){
                Subcategory data = new Subcategory(rs.getString(1), rs.getString(2), rs.getString(3));
                arr.add(data);
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
        return arr;
    }

    //Cities 데이터베이스 Read
    public ArrayList<City> readCity(){
        ArrayList<City> arr = new ArrayList<City>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from City");
            while(rs.next()){
                City data = new City(rs.getString(1), rs.getString(2));
                arr.add(data);
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
        return arr;
    }
}
