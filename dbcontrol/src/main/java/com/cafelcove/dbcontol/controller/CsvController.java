package com.cafelcove.dbcontol.controller;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.dbcontol.entity.Category;
import com.cafelcove.dbcontol.entity.City;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.entity.Subcategory;
import com.cafelcove.dbcontol.repository.CsvDao;
import com.cafelcove.dbcontol.repository.DbReadDao;


@RequestMapping("/csvcontroller")
@RestController
public class CsvController {

    @PostMapping(value = "/csvinsertAll/fromDb")
    public ResponseEntity<?> csvInsertAll(@RequestParam("table") String table){
        DbReadDao db = new DbReadDao();
        CsvDao csv = new CsvDao();
        if(table.equals("City")){
            ArrayList<City> city = new ArrayList<City>();
            city = db.readCity();
            csv.writeCityCSV(city);
        } else if(table.equals("Category")){
            ArrayList<Category> category = new ArrayList<Category>();
            category = db.readCategory();
            csv.writeCategoryCSV(category);
        } else if(table.equals("Subcategory")){
            ArrayList<Subcategory> subcategory = new ArrayList<Subcategory>();
            subcategory = db.readSubcategory();
            csv.writeSubcategoryCSV(subcategory);
        } else if(table.equals("Place")){
            ArrayList<Place> place = new ArrayList<Place>();
            place = db.readPlace();
            csv.writePlacesCSV(place);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }
    
}
