package com.cafelcove.dbcontol.dto;

import org.springframework.stereotype.Repository;


//@Value null값 반환 이슈로 임시 사용
@Repository
public class ApiInfo {

    public static String naver_id = "";
    public static String naver_pw = "";
    public static String naver_geocoding = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=";

    public static String jdbc_page = "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY";
    public static String jdbc_id = "";
    public static String jdbc_pw = "";

    
}
