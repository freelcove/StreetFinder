package com.cafelcove.dbcontol.dto;

import org.springframework.stereotype.Repository;


//@Value null값 반환 이슈로 임시 사용
@Repository
public class ApiInfo {

    public static String naver_id = "iejwtnh1zj";
    public static String naver_pw = "qew1pbfxNyicXbziazpfWK2VZm85j2gMOWhXQlzH";
    public static String naver_geocoding = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=";

    public static String jdbc_page = "jdbc:mysql://aws.connect.psdb.cloud/streetfinder?sslMode=VERIFY_IDENTITY";
    public static String jdbc_id = "ce1j3r3su80gsajytx5f";
    public static String jdbc_pw = "pscale_pw_OU6EDG0C71fnG8ZgFfyg7BdY61UKVmbru7cGsiXx1Te";

    
}
