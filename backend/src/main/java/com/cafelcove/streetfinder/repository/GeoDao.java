package com.cafelcove.streetfinder.repository;

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
public class GeoDao {

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
        String addr = null;
        URL url = null;
        HttpURLConnection con = null;
        if(checkValue()){
            return positionDTO;
        }
        try {
            System.out.println(address);
            addr = URLEncoder.encode(address, "UTF-8");
            apiURL += addr;
            url = new URL(apiURL);
            con = (HttpURLConnection) url.openConnection();
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
            System.out.println(object);
			JSONArray arr = object.getJSONArray("addresses");

            for (int i = 0; i < arr.length(); i++) {
			    JSONObject temp = (JSONObject) arr.get(i);
                String latitude = (String) temp.get("x");
                String longiutde = (String) temp.get("y");
                if(i==0){
                positionDTO.setLatitude(Float.parseFloat(latitude));
                positionDTO.setLongitude(Float.parseFloat(longiutde));
                }
			}
            con.disconnect();
            tokener=null;
            object=null;
            arr=null;
        } catch (Exception e) {
            System.out.println(e);
        } finally {

        }
        return positionDTO;
    }



}
