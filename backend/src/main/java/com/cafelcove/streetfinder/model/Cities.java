package com.cafelcove.streetfinder.model;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class Cities {
    private int city_id;
    private String city_name;

    public Cities(){}

    public Cities(String city_id, String city_name){
        this.city_id=Integer.parseInt(city_id);
        this.city_name=city_name;
    }

     public Cities(int city_id, String city_name){
        this.city_id=city_id;
        this.city_name=city_name;
    }

    @Override
    public String toString() {
        String result = "";
        result += "City_Id : " + city_id + ", City_Name : " + city_name + "\n";
        return result;
    }
}
