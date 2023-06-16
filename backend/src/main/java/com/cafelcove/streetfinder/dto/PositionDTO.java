package com.cafelcove.streetfinder.dto;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Repository
@Getter
@Setter
public class PositionDTO {
    private Float latitude;
    private Float longitude;

    @Override
    public String toString() {
        return "Latitude: " + latitude + "\nLongitude : " + longitude;
    }


}


