package com.cafelcove.streetfinder.dto;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlacesDTO {
    private int place_id;
    private String place_name;
    private Float latitude;
    private Float longitude;
    private int city_id;
    private String place_address;
    private int category_id;
    private int subcategory_id;
    private String created_at;
    private String updated_at;

    

    public PlacesDTO(){}

    public String checkEmpty(String input){
        if(input.equals("")){
            return "0";
        }
        return input;
    }

    public PlacesDTO(String place_id, String place_name, String latitude, String logitude, String city_id, String place_address, String category_id, String subcategory_id, String created_at, String updated_at){
        this.place_id = Integer.parseInt(place_id);
        this.place_name = place_name;
        this.latitude = Float.parseFloat(checkEmpty(latitude));
        this.longitude = Float.parseFloat(checkEmpty(logitude));
        this.city_id = Integer.parseInt(city_id);
        this.place_address = place_address;
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    @Override
    public String toString() {
        String result = "";
        result += place_id + ", " + place_name + "\n";
        return result;
    }
}
