package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CitiesDTO {
    private int city_id;
    private String city_name;

    public CitiesDTO(){}

    public CitiesDTO(String city_name, String city_id){
        this.city_id=Integer.parseInt(city_id);
        this.city_name=city_name;
    }

    @Override
    public String toString() {
        String result = "";
        result += "City_Id : " + city_id + ", City_Name : " + city_name + "\n";
        return result;
    }
}
