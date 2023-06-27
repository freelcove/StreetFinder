package com.cafelcove.dbcontol.entity;


import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Repository
public class Place {
    private int id;
    private String name;
    private Float latitude;
    private Float longitude;
    private int city_id;
    private String address;
    private int category_id;
    private int subcategory_id;
    private int visits;
    private String created_at;
    private String updated_at;

    

    public Place(){}

    public String checkEmpty(String input){
        if(input.equals("")){
            return "0";
        }
        return input;
    }

    public Place(String id, String name, String latitude, String logitude, String city_id, String address, String category_id, String subcategory_id, String visits, String created_at, String updated_at){
        this.id = Integer.parseInt(id);
        this.name = name;
        this.latitude = Float.parseFloat(latitude);
        this.longitude = Float.parseFloat(logitude);
        this.city_id = Integer.parseInt(city_id);
        this.address = address;
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.visits = Integer.parseInt(visits);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Place(String id, String name, Float latitude, Float logitude, String city_id, String address, String category_id, String subcategory_id, String visits, String created_at, String updated_at){
        this.id = Integer.parseInt(id);
        this.name = name;
        this.latitude = latitude;
        this.longitude = logitude;
        this.city_id = Integer.parseInt(city_id);
        this.address = address;
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.visits = Integer.parseInt(visits);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Place(String id, String name, Float latitude, Float logitude, String city_id, String address, String category_id, String subcategory_id, String visits){
        this.id = Integer.parseInt(id);
        this.name = name;
        this.latitude = latitude;
        this.longitude = logitude;
        this.city_id = Integer.parseInt(city_id);
        this.address = address;
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.visits = Integer.parseInt(visits);
        this.created_at = null;
        this.updated_at = null;
    }

        public Place (int id, String name, Float latitude, Float logitude, int city_id, String address, int category_id, int subcategory_id, int visits, String created_at, String updated_at){
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = logitude;
        this.city_id = city_id;
        this.address = address;
        this.category_id = category_id;
        this.subcategory_id = subcategory_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }


    @Override
    public String toString() {
        String result = "";
        result += id + ", " + name + ", " + latitude + ", " + longitude + "\n";
        return result;
    }

}
