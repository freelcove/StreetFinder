package com.cafelcove.dbcontol.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.dbcontol.entity.Category;
import com.cafelcove.dbcontol.entity.City;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.entity.Subcategory;
import com.cafelcove.dbcontol.repository.CsvDao;
import com.cafelcove.dbcontol.repository.DbDeleteDao;
import com.cafelcove.dbcontol.repository.DbInsertDao;
import com.cafelcove.dbcontol.repository.DbReadDao;
import com.cafelcove.dbcontol.repository.DbUpdateDao;
import com.cafelcove.dbcontol.repository.HtmlDao;

@RequestMapping("/dbcontroller")
@RestController
public class DbController {

    @PostMapping(value = "/insertAll/fromCsv")
    public ResponseEntity<?> insertData(@RequestParam String table) {
        CsvDao csv = new CsvDao();
        DbInsertDao db = new DbInsertDao();
        if (table.equals("City")) {
            ArrayList<City> city = new ArrayList<City>();
            city = csv.readCityCSV();
            db.insertCity(city);
        } else if (table.equals("Category")) {
            ArrayList<Category> category = new ArrayList<Category>();
            category = csv.readCategoryCSV();
            db.insertCategory(category);
        } else if (table.equals("Subcategory")) {
            ArrayList<Subcategory> subcategory = new ArrayList<Subcategory>();
            subcategory = csv.readSubcategoryCSV();
            db.insertSubcategory(subcategory);
        } else if (table.equals("Place")) {
            ArrayList<Place> place = new ArrayList<Place>();
            place = csv.readPlaceCSV();
            db.insertPlace(place);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping(value = "/insertAll/fromText")
    public String inputData(@RequestParam String table) {
        String html = "";
        HtmlDao htmlDao = new HtmlDao();
        if (table.equals("City")) {
            html = htmlDao.listCityTextbox();
        } else if (table.equals("Category")) {
            html = htmlDao.listCategoryTextbox();
        } else if (table.equals("Subcategory")) {
            html = htmlDao.listSubcategoryTextbox();
        } else if (table.equals("Place")) {
            html = htmlDao.listPlaceTextbox();
        }
        return html;
    }

    @PostMapping(value = "/insertAll/fromText")
    public ResponseEntity<?> insertData(@RequestParam Map<String, Object> map) {
        DbInsertDao db = new DbInsertDao();
        String table = (String) map.get("table");
        if (table.equals("City")) {
            ArrayList<City> city = new ArrayList<City>();
            City data = new City((String) map.get("id"), (String) map.get("name"));
            city.add(data);
            db.insertCity(city);
        } else if (table.equals("Category")) {
            ArrayList<Category> category = new ArrayList<Category>();
            Category data = new Category((String) map.get("id"), (String) map.get("name"));
            category.add(data);
            db.insertCategory(category);
        } else if (table.equals("Subcategory")) {
            ArrayList<Subcategory> subcategory = new ArrayList<Subcategory>();
            Subcategory data = new Subcategory((String) map.get("id"), (String) map.get("name"),
                    (String) map.get("category_id"));
            subcategory.add(data);
            db.insertSubcategory(subcategory);
        } else if (table.equals("Place")) {
            ArrayList<Place> place = new ArrayList<Place>();
            Place data = new Place((String) map.get("id"), (String) map.get("name"), (String) map.get("latitude"),
                    (String) map.get("longitude"), (String) map.get("city_id"), (String) map.get("address"),
                    (String) map.get("category_is"), (String) map.get("subcategory_id"), null, null);
            place.add(data);
            db.insertPlace(place);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<?> deleteData(@RequestParam("table") String table, @RequestParam("id") String id) {
        DbDeleteDao db = new DbDeleteDao();
        String variable1 = table;
        int variable2 = Integer.parseInt(id);
        if (variable1.equals("City")) {
            db.deleteCity(variable2);
        } else if (variable1.equals("Category")) {
            db.deleteCategory(variable2);
        } else if (variable1.equals("Subcategory")) {
            db.deleteSubcategory(variable2);
        } else if (variable1.equals("Place")) {
            db.deletePlace(variable2);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping(value = "/read")
    public String readData(@RequestParam("table") String table) {
        DbReadDao db = new DbReadDao();
        HtmlDao html = new HtmlDao();
        String result = "";
        if (table.equals("City")) {
            ArrayList<City> data = db.readCity();
            result += html.listCity(data);
        } else if (table.equals("Place")) {
            ArrayList<Place> data = db.readPlace();
            result += html.listPlace(data);
        } else if (table.equals("Category")) {
            ArrayList<Category> data = db.readCategory();
            result += html.listCategory(data);
        } else if (table.equals("Subcategory")) {
            ArrayList<Subcategory> data = db.readSubcategory();
            result += html.listSubcategory(data);
        }
        return result;
    }

    @PostMapping(value = "/update")
    public ResponseEntity<?> updateData(@RequestParam("table") String table) {
        DbUpdateDao db = new DbUpdateDao();
        String variable1 = table;
        if (variable1.equals("City")) {
        } else if (variable1.equals("Category")) {
        } else if (variable1.equals("Subcategory")) {
        } else if (variable1.equals("Place")) {
            db.updatePlace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

}
