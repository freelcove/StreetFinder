package com.cafelcove.streetfinder.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.streetfinder.dto.CategoryDTO;
import com.cafelcove.streetfinder.dto.CitiesDTO;
import com.cafelcove.streetfinder.dto.PlacesDTO;
import com.cafelcove.streetfinder.dto.SubcategoryDTO;
import com.cafelcove.streetfinder.dto.TotalDTO;
import com.cafelcove.streetfinder.csv.CsvParser;
import com.cafelcove.streetfinder.dao.MysqlDAO;

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

    @GetMapping(value = "/dbconnect")
    public String dbtest() {
        MysqlDAO mysql = new MysqlDAO();
        ArrayList<PlacesDTO> data = new CsvParser().readPlacesCSV();
        mysql.writePlaces(data);
        return "0";
    }

    @GetMapping(value = "/testCSVRead/{variable}")
    public String csvTest(@PathVariable String variable) {
        CsvParser csvparser = new CsvParser();
        String result = "";
        if (variable.equals("total")) {
            ArrayList<TotalDTO> data = csvparser.readTotalCSV();
            for (TotalDTO item : data) {
                result += item.toString();
            }
        } else if (variable.equals("category")) {
            ArrayList<CategoryDTO> data = csvparser.readCategoryCSV();
            for (CategoryDTO item : data) {
                result += item.toString();
            }
        } else if (variable.equals("cities")) {
            ArrayList<CitiesDTO> data = csvparser.readCitiesCSV();
            for (CitiesDTO item : data) {
                result += item.toString();
            }
        } else if (variable.equals("places")) {
            ArrayList<PlacesDTO> data = csvparser.readPlacesCSV();
            for (PlacesDTO item : data) {
                result += item.toString();
            }
        } else if (variable.equals("subcategory")) {
            ArrayList<SubcategoryDTO> data = csvparser.readSubcategoryCSV();
            for (SubcategoryDTO item : data) {
                result += item.toString();
            }
        }
        return result;
    }
}
