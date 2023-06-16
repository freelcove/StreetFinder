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
public class DbInsertDAO {

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

    //places 데이터베이스 Insert
    public void insertPlaces(ArrayList<Places> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (Places item : data) {
                try {
                    String sql = "";
                    sql="insert into places(place_id, place_name, latitude, longitude, city_id, place_address, category_id, subcategory_id) values(?,?,?,?,?,?,?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getPlace_id());
                    pstmt.setString(2, item.getPlace_name());
                    pstmt.setFloat(3, item.getLatitude());
                    pstmt.setFloat(4, item.getLongitude());
                    pstmt.setInt(5, item.getCity_id());
                    pstmt.setString(6, item.getPlace_address());
                    pstmt.setInt(7, item.getCategory_id());
                    pstmt.setInt(8, item.getSubcategory_id());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        pstmt.close();
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
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
    }

    //Category 데이터베이스 Insert
    public void insertCategory(ArrayList<Category> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (Category item : data) {
                try {
                    String sql = "";
                    sql="insert into category(category_id, category_name) values(?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getCategory_id());
                    pstmt.setString(2, item.getCategory_name());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        pstmt.close();
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
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
    }

    //Subcategory 데이터베이스 Insert
    public void insertSubcategory(ArrayList<Subcategory> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (Subcategory item : data) {
                try {
                    String sql = "";
                    sql="insert into subcategory(subcategory_id, category_id,subcategory_name) values(?,?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getSubcategory_id());
                    pstmt.setInt(2,item.getCategory_id());
                    pstmt.setString(3, item.getSubcategory_name());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        pstmt.close();
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
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
    }

    //Cities 데이터베이스 Insert
    public void insertCities(ArrayList<Cities> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (Cities item : data) {
                try {
                    String sql = "";
                    sql="insert into Cities(City_id, City_name) values(?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getCity_id());
                    pstmt.setString(3, item.getCity_name());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        pstmt.close();
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
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
    }
}
