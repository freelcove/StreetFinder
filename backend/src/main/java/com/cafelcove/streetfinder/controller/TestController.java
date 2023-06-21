package com.cafelcove.streetfinder.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.streetfinder.dto.PositionDTO;
import com.cafelcove.streetfinder.dto.TotalDTO;
import com.cafelcove.streetfinder.entity.City;
import com.cafelcove.streetfinder.entity.Place;
import com.cafelcove.streetfinder.entity.Subcategory;
import com.cafelcove.streetfinder.entity.Category;
import com.cafelcove.streetfinder.repository.CsvDao;
import com.cafelcove.streetfinder.repository.DbInsertDao;
import com.cafelcove.streetfinder.repository.DbReadDao;
import com.cafelcove.streetfinder.repository.DbUpdateDao;
import com.cafelcove.streetfinder.repository.GeoDao;


@RestController
public class TestController {

    public static class Greeting {
        private String message;

        public Greeting(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @GetMapping("/hello")
    public Greeting hello() {
        return new Greeting("Hello from backend");
    }

    @GetMapping("/coordinates")
    public Map<String, Double> getCoordinates() {
        Map<String, Double> coordinates = new HashMap<>();
    
        double latitude = generateRandomCoordinate(35.77, 35.98, 7);
        double longitude = generateRandomCoordinate(128.43, 128.77, 7); 
        coordinates.put("latitude", latitude);
        coordinates.put("longitude", longitude);
    
         return coordinates;
    }

    private double generateRandomCoordinate(double min, double max, int decimalPoint) {
        Random random = new Random();
        double value = min + (max - min) * random.nextDouble();

        double scale = Math.pow(10, decimalPoint);
        return Math.round(value * scale) / scale;
    }

     @GetMapping(value = "/csvconnect")
    public String dbtest(){
        DbInsertDao mysql = new DbInsertDao();
        ArrayList<Place> data = new CsvDao().readPlaceCSV();
        mysql.insertPlace(data);
        String result = "";
        for (Place item : data) {
            result += item.toString();
        }
        return result;
    }

    @GetMapping(value = "/dbconnect/")
    public String test(@RequestParam("id") int id){
        
        DbUpdateDao mysqlDao = new DbUpdateDao();
        mysqlDao.updateEachPlace(id);
        return "success";
    }

    @GetMapping(value = "/dbconnect/{table}")
    public String dbPlaces(@PathVariable String table){
        String result = "";
        DbReadDao mysqlDAO = new DbReadDao();
        if(table.equals("Place")){
            ArrayList<Place> arr = mysqlDAO.readPlace();
            for (Place item : arr) {
                result += item.toString();
            }
        } else if(table.equals("City")){
            ArrayList<City> arr = mysqlDAO.readCity();
            for (City item : arr) {
                result += item.toString();
            }
        } else if(table.equals("Category")){
            ArrayList<Category> arr = mysqlDAO.readCategory();
            for (Category item : arr) {
                result += item.toString();
            }
        } else if(table.equals("Subcategory")){
            ArrayList<Subcategory> arr = mysqlDAO.readSubcategory();
            for (Subcategory item : arr) {
                result += item.toString();
            }
        }
        return result;
    }

    @GetMapping(value = "/apiconnect/places/{variable}")
    public String apiTest(@PathVariable String variable){
        GeoDao geoDAO = new GeoDao();
        PositionDTO positionDTO = new PositionDTO();
        positionDTO = geoDAO.setPlacesLatitudeLongitude(variable);
        return positionDTO.toString();

    }

    @GetMapping(value = "/testCSVRead/{variable}")
    public String csvTest(@PathVariable String variable){
        CsvDao csvparser = new CsvDao();
        String result ="";
        if(variable.equals("total")){
            ArrayList<TotalDTO> data = csvparser.readTotalCSV();
            for (TotalDTO item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("Category")){
            ArrayList<Category> data = csvparser.readCategoryCSV();
            for (Category item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("City")){
            ArrayList<City> data = csvparser.readCityCSV();
            for (City item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("Place")){
            ArrayList<Place> data = csvparser.readPlaceCSV();
            for (Place item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("Subcategory")){
            ArrayList<Subcategory> data = csvparser.readSubcategoryCSV();
            for (Subcategory item : data) {
                result+=item.toString();
            }
        }
        return result;
    }
}
