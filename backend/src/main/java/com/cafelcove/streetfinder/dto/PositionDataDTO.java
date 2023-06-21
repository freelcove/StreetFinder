package com.cafelcove.streetfinder.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionDataDTO {
    private String result = "Fail";
    private List<PositionDTO> data;
}
