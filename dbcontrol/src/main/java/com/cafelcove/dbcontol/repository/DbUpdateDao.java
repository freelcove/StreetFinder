package com.cafelcove.dbcontol.repository;

import java.sql.*;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.cafelcove.dbcontol.dto.ApiInfo;
import com.cafelcove.dbcontol.dto.PositionDTO;
import com.cafelcove.dbcontol.entity.Category;
import com.cafelcove.dbcontol.entity.City;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.entity.Subcategory;

@Component
public class DbUpdateDao {

    private Connection conn = null;
    private PreparedStatement pstmt = null;

    private String dbConnectionPage = ApiInfo.jdbc_page;
    private String dbConnectionId = ApiInfo.jdbc_id;
    private String dbConnectionPw = ApiInfo.jdbc_pw;

    public boolean checkValue() {
        if (dbConnectionId == null) {
            System.out.println("dbId 오류");
            return true;
        } else if (dbConnectionPw == null) {
            System.out.println("dbId 오류");
            return true;
        } else if (dbConnectionPage == null) {
            System.out.println("dbPage 오류");
            return true;
        } else {
            return false;
        }
    }

    // places 데이터베이스 update
    public void updatePlace() {
        if (checkValue()) {
            return;
        }
        ArrayList<Place> arr = new DbReadDao().readPlace();
        for (Place data : arr) {
            if (data.getLatitude() < 0 && data.getLongitude() < 0) {
                try {
                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

                    GeoDao geoDao = new GeoDao();
                    PositionDTO positionDTO = geoDao.setPlacesLatitudeLongitude(data.getAddress());
                    if (positionDTO.getLatitude() == null) {
                        positionDTO = geoDao.setPlacesLatitudeLongitude(data.getAddress() + data.getName());
                    }
                    String sql = "";
                    sql = "update Place set latitude = ?, longitude = ?, updated_at = now() where id=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setFloat(1, positionDTO.getLatitude());
                    pstmt.setFloat(2, positionDTO.getLongitude());
                    pstmt.setInt(3, data.getId());
                    System.out.println(pstmt);
                    pstmt.executeUpdate();
                } catch (Exception e3) {
                    e3.printStackTrace();
                } finally {
                    try {
                        if (conn != null) {
                            conn.close();
                        }
                        if (pstmt != null) {
                            pstmt.close();
                        }
                    } catch (Exception e4) {
                        e4.printStackTrace();
                    }
                }
            }
        }
    }

    public void updateEachPlace(int id) {
        if (checkValue()) {
            return;
        }
        Place data = new DbReadDao().readEachPlace(id);
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbConnectionPage, dbConnectionId, dbConnectionPw);

            GeoDao geoDao = new GeoDao();
            PositionDTO positionDTO = geoDao.setPlacesLatitudeLongitude(data.getAddress());
            if (positionDTO.getLatitude() == null) {
                positionDTO = geoDao.setPlacesLatitudeLongitude(data.getAddress() + data.getName());
            }
            String sql = "";
            sql = "update Place set latitude = ?, longitude = ?, updated_at = now() where id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setFloat(1, positionDTO.getLatitude());
            pstmt.setFloat(2, positionDTO.getLongitude());
            pstmt.setInt(3, data.getId());
            System.out.println(pstmt);
            pstmt.executeUpdate();
        } catch (Exception e3) {
            e3.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
                if (pstmt != null) {
                    pstmt.close();
                }
            } catch (Exception e4) {
                e4.printStackTrace();
            }

        }
    }
}