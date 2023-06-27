package com.cafelcove.streetfinder.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class PlaceDTO {
    private int id;
    private String name;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
