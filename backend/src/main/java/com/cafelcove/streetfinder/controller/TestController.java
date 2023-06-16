package com.cafelcove.streetfinder.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.streetfinder.dto.PositionDTO;
import com.cafelcove.streetfinder.dto.TotalDTO;
import com.cafelcove.streetfinder.model.Category;
import com.cafelcove.streetfinder.model.Cities;
import com.cafelcove.streetfinder.model.Places;
import com.cafelcove.streetfinder.model.Subcategory;
import com.cafelcove.streetfinder.dao.CsvDAO;
import com.cafelcove.streetfinder.dao.GeoDAO;
import com.cafelcove.streetfinder.dao.DbInsertDAO;
import com.cafelcove.streetfinder.dao.DbReadDAO;

@RestController
@RequestMapping("/com/v1/controll")
public class TestController {
    
	// private String clientId = ApiInfo.naver_id;
	// private String clientSecret = ApiInfo.naver_pw;
	// private String apiURL = ApiInfo.naver_geocoding;


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

    @GetMapping(value = "/csvconnect")
    public String dbtest(){
        DbInsertDAO mysql = new DbInsertDAO();
        ArrayList<Places> data = new CsvDAO().readPlacesCSV();
        mysql.insertPlaces(data);
        String result = "";
        for (Places item : data) {
            result += item.toString();
        }
        return result;
    }

    @GetMapping(value = "/dbconnect/places")
    public String dbPlaces(){
        String result = "";
        DbReadDAO mysqlDAO = new DbReadDAO();
        ArrayList<Places> arr = mysqlDAO.readPlaces();
        for (Places item : arr) {
            result += item.toString();
        }
        return result;
    }

    @GetMapping(value = "/apiconnect/places/{variable}")
    public String apiTest(@PathVariable String variable){
        GeoDAO geoDAO = new GeoDAO();
        PositionDTO positionDTO = new PositionDTO();
        positionDTO = geoDAO.setPlacesLatitudeLongitude(variable);
        return positionDTO.toString();

    }

    @GetMapping(value = "/testCSVRead/{variable}")
    public String csvTest(@PathVariable String variable){
        CsvDAO csvparser = new CsvDAO();
        String result ="";
        if(variable.equals("total")){
            ArrayList<TotalDTO> data = csvparser.readTotalCSV();
            for (TotalDTO item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("category")){
            ArrayList<Category> data = csvparser.readCategoryCSV();
            for (Category item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("cities")){
            ArrayList<Cities> data = csvparser.readCitiesCSV();
            for (Cities item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("places")){
            ArrayList<Places> data = csvparser.readPlacesCSV();
            for (Places item : data) {
                result+=item.toString();
            }
        } else if(variable.equals("subcategory")){
            ArrayList<Subcategory> data = csvparser.readSubcategoryCSV();
            for (Subcategory item : data) {
                result+=item.toString();
            }
        }
        return result;
    }

}
