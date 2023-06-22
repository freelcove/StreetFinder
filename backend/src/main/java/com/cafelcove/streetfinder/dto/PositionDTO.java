package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionDTO {
    private int place_id;
    private String place_name;
    private Float latitude;
    private Float longitude;


    @Override
    public String toString() {
        String result = "";
        result += "{place_id: "+ this.place_id + ", place_name: " + this.place_name + ", latitude: " + this.latitude + ", longitude: " + this.longitude + "}";
        return result;
    }
}
