package com.cafelcove.dbcontol.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.dbcontol.dto.PositionDTO;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.repository.DbReadDao;

@RestController
@RequestMapping("/streetfinder")
public class ConnectionApi {

    public static JSONArray convertListToJson(List<Map<String, Object>> list){

        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> map : list){
            jsonArray.put(convertMapToJson(map));
        }
        return jsonArray;
    }

    public static JSONObject convertMapToJson(Map<String, Object> map){
        JSONObject json = new JSONObject();
        for (Map.Entry<String, Object> entry : map.entrySet()){
            String key = entry.getKey();
            Object value = entry.getValue();
            json.put(key, value);
        }
        return json;
    }

    @GetMapping(value = "/randplace")
    public List<Map<String, Object>> randplace() {
        List<Map<String, Object>> data = new ArrayList<>();
        int[] ids = new int[5];
        for (int i = 0; i < 5; i++) {
            Map<String, Object> map = new HashMap<>();
            PositionDTO position = new PositionDTO();
            int rand = (int) Math.floor(Math.random() * 1000);
            boolean isDuplication = false;
            for (int j = 0; j <= i; j++) {
                if (ids[j] == rand) {
                    isDuplication = true;
                }
                if (isDuplication) {
                    j--;
                    rand = (int) Math.floor(Math.random() * 1000);
                }
            }
            DbReadDao db = new DbReadDao();
            Place place = db.readEachPlace(rand);
            if (place == null) {
                while (place == null) {
                    rand = (int) Math.floor(Math.random() * 1000);
                    for (int j = 0; j <= i; j++) {
                        if (ids[j] == rand) {
                            isDuplication = true;
                        }
                        if (isDuplication) {
                            j--;
                            rand = (int) Math.floor(Math.random() * 1000);
                        }
                    }
                    place = db.readEachPlace(rand);
                }

            }
            position.setLatitude(place.getLatitude());
            position.setLongitude(place.getLongitude());
            String id=String.valueOf(place.getId());
            map.put(id, position);
            data.add(map);
        }

        return data;

    }

    @GetMapping(value = "/onerandplace")
    public PositionDTO onerandplace(){
        PositionDTO position = new PositionDTO();
        int rand = (int) Math.floor(Math.random()*1000);
        Place place = new DbReadDao().readEachPlace(rand);
        position.setLatitude(place.getLatitude());
        position.setLongitude(place.getLongitude());
        System.out.println(position.toString());
        return position;


    }

}
