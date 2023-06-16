package com.cafelcove.streetfinder.dao;

import java.sql.*;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.cafelcove.streetfinder.dto.ApiInfo;
import com.cafelcove.streetfinder.model.Category;
import com.cafelcove.streetfinder.model.Cities;
import com.cafelcove.streetfinder.model.Places;
import com.cafelcove.streetfinder.model.Subcategory;

    
@Component
public class DbReadDAO {

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
    public ArrayList<Places> readPlaces(){
        ArrayList<Places> arr = new ArrayList<Places>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            String sql = "select * from places;";
            rs = stmt.executeQuery(sql);
            while(rs.next()){
                Places data = new Places(rs.getString(0),rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9));
                arr.add(data);
            }
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                conn.close();
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
            rs = stmt.executeQuery("select * from places");
            while(rs.next()){
                Category data = new Category(rs.getString(0), rs.getString(1));
                arr.add(data);
            }
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
            rs = stmt.executeQuery("select * from places");
            while(rs.next()){
                Subcategory data = new Subcategory(rs.getString(0), rs.getString(1), rs.getString(2));
                arr.add(data);
            }
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
        return arr;
    }

    //Cities 데이터베이스 Read
    public ArrayList<Cities> readSCities(){
        ArrayList<Cities> arr = new ArrayList<Cities>();
        if(checkValue()){
            return arr;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from places");
            while(rs.next()){
                Cities data = new Cities(rs.getString(0), rs.getString(1));
                arr.add(data);
            }
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
        return arr;
    }
}
