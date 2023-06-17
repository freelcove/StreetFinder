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
}
