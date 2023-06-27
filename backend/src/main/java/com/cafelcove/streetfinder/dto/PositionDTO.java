package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionDTO {
    private int place_id;
    private String place_name;
    private Float lat;
    private Float lng;
    private int visits;


    public PositionDTO(String place_id, String place_name, String lat, String lng, String visits){
        this.place_id = Integer.parseInt(place_id);
        this.place_name = place_name;
        this.lat = Float.parseFloat(lat);
        this.lng = Float.parseFloat(lng);
        this.visits = Integer.parseInt(visits);
    }

    public PositionDTO(){}

    @Override
    public String toString() {
        String result = "";
        result += "{place_id: "+ this.place_id + ", place_name: " + this.place_name + ", latitude: " + this.lat + ", longitude: " + this.lng + ", visits: " + this.visits +  "}";
        return result;
    }
}
