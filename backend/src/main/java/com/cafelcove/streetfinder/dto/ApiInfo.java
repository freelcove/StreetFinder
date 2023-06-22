package com.cafelcove.streetfinder.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;


//@Value null값 반환 이슈로 임시 사용
@Repository
public class ApiInfo {

    @Value("${spring.datasource.username}")
        private static String jdbcId;
    @Value("spring.datasource.password")
        private static String jdbcPw;
    @Value("NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID")
        private static String NAVERID;
    @Value("NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_PW")
        private static String NAVERPW;


    public static String naver_id = NAVERID;
    public static String naver_pw = NAVERPW;
    public static String naver_geocoding = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=";

    public static String jdbc_page = "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY";
    public static String jdbc_id = jdbcId;
    public static String jdbc_pw = jdbcPw;

    
}
