package com.cafelcove.streetfinder.dao;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.stereotype.Component;

import com.cafelcove.streetfinder.dto.ApiInfo;
import com.cafelcove.streetfinder.dto.PositionDTO;

@Component
public class GeoDAO {

    private String clientId = ApiInfo.naver_id;
    private String clientSecret = ApiInfo.naver_pw;
    private String apiURL = ApiInfo.naver_geocoding;

    public boolean checkValue(){
        if(clientId==null){
            System.out.println("clientId 오류");
            return true;
        } else if(clientSecret==null){
            System.out.println("clientSecret 오류");
            return true;
        } else if(apiURL==null){
            System.out.println("apiURL 오류");
            return true;
        } else {
            return false;
        }
    }

    public PositionDTO setPlacesLatitudeLongitude(String address){
        PositionDTO positionDTO = new PositionDTO();
        if(checkValue()){
            return positionDTO;
        }
        try {
            String addr = URLEncoder.encode(address, "UTF-8");

            apiURL += addr;

            System.out.println(apiURL);
            System.out.println(clientId);
            System.out.println(clientSecret);
            
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);


            int responseCode = con.getResponseCode();

            BufferedReader br;

            if(responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;

            StringBuffer response = new StringBuffer();

            while((inputLine = br.readLine()) != null){
                response.append(inputLine);
            }

            br.close();

            JSONTokener tokener = new JSONTokener(response.toString());
            JSONObject object = new JSONObject(tokener);
			JSONArray arr = object.getJSONArray("addresses");
			
            for (Object object2 : arr) {
                System.out.println(object2);
            }

            for (int i = 0; i < arr.length(); i++) {
			    JSONObject temp = (JSONObject) arr.get(i);
                String latitude = (String) temp.get("x");
                String longiutde = (String) temp.get("y");
                System.out.println(latitude + " | " + longiutde);
                if(i==0){
                positionDTO.setLatitude(Float.parseFloat(latitude));
                positionDTO.setLongitude(Float.parseFloat(longiutde));
                }
			}
        } catch (Exception e) {
            System.out.println(e);
        }
        return positionDTO;
    }



}
