package com.cafelcove.streetfinder.repository;

import java.sql.*;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.cafelcove.streetfinder.dto.ApiInfo;
import com.cafelcove.streetfinder.entity.Category;
import com.cafelcove.streetfinder.entity.City;
import com.cafelcove.streetfinder.entity.Place;
import com.cafelcove.streetfinder.entity.Subcategory;

    
@Component
public class DbInsertDao {

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
    public void insertPlace(ArrayList<Place> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (Place item : data) {
                if(item.getLatitude()==null){
                    continue;
                }
                try {
                    String sql = "";
                    sql="insert into Place(id, name, latitude, longitude, city_id, address, category_id, subcategory_id) values(?,?,?,?,?,?,?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getId());
                    pstmt.setString(2, item.getName());
                    pstmt.setFloat(3, item.getLatitude());
                    pstmt.setFloat(4, item.getLongitude());
                    pstmt.setInt(5, item.getCity_id());
                    pstmt.setString(6, item.getAddress());
                    pstmt.setInt(7, item.getCategory_id());
                    pstmt.setInt(8, item.getSubcategory_id());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if(pstmt!=null){
                            pstmt.close();
                        }
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
            }
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
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
                    sql="insert into Category(id, name) values(?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getId());
                    pstmt.setString(2, item.getName());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if(pstmt!=null){
                            pstmt.close();
                        }
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
            }
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
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
                    sql="insert into Subcategory(id, category_id,name) values(?,?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getId());
                    pstmt.setInt(2,item.getCategory_id());
                    pstmt.setString(3, item.getName());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if(pstmt!=null){
                            pstmt.close();
                        }
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
            }
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }

    //Cities 데이터베이스 Insert
    public void insertCity(ArrayList<City> data){
        if(checkValue()){
            return;
        }
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);
            for (City item : data) {
                try {
                    String sql = "";
                    sql="insert into City(id, name) values(?,?);";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1,item.getId());
                    pstmt.setString(2, item.getName());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if(pstmt!=null){
                            pstmt.close();
                        }
                    } catch (Exception e2) {
                        e2.printStackTrace();
                    }
                }
            }
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if(conn!=null){
                    conn.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }
        }
    }
}
