package com.cafelcove.streetfinder.dto;

import org.springframework.stereotype.Repository;


//@Value null값 반환 이슈로 임시 사용
@Repository
public class ApiInfo {

    public static String naver_id = {Naver에서 받은 ID 입력}
    public static String naver_pw = {Naver에서 받은 Secret 입력}
    public static String naver_geocoding = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=";

    public static String jdbc_page = "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY";
    public static String jdbc_id = {DB에서 받은 ID 입력}
    public static String jdbc_pw = {DB에서 받은 PW 입력}

    
}
