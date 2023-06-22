package com.cafelcove.streetfinder.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController2 {

    @GetMapping("/coordinates")
    public Map<String, Double> getCoordinates() {
        Map<String, Double> coordinates = new HashMap<>();
    
        double lat = generateRandomCoordinate(35.77, 35.98, 7);
        double lng = generateRandomCoordinate(128.43, 128.77, 7); 
        coordinates.put("lat", lat);
        coordinates.put("lng", lng);
    
         return coordinates;
    }

    private double generateRandomCoordinate(double min, double max, int decimalPoint) {
        Random random = new Random();
        double value = min + (max - min) * random.nextDouble();

        double scale = Math.pow(10, decimalPoint);
        return Math.round(value * scale) / scale;
    }

   
}
