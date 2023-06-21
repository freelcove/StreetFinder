package com.cafelcove.dbcontol.repository;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.cafelcove.dbcontol.entity.Category;
import com.cafelcove.dbcontol.entity.City;
import com.cafelcove.dbcontol.entity.Place;
import com.cafelcove.dbcontol.entity.Subcategory;

@Service
public class HtmlDao {
    public String listCity(ArrayList<City> data){
        String html = "<form action=\"delete\" method=\"post\">";
        html+="<input type = \"text\" value = \"City\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>선택</th></tr>";
        for (City item : data) {
            html+="<tr><td>"+ item.getId() + "</td><td>" + item.getName() + "</td><td><input type=\"radio\" name=\"id\" value=\""+ item.getId() +"\"></td></tr>";
        }
        html+="</table><input type=\"submit\" value=\"삭제\"></form><a href=\"/\">Home</a>";
        return html;
    }
    public String listCityTextbox(){
        String html = "<form action=\"\" method=\"post\">";
        html+="<input type = \"text\" value = \"City\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th></tr>";
        html+="<tr><td><input type=\"text\" name=\"id\"></td><td><input type=\"text\" name=\"name\"></td></tr>";
        html+="</table><input type=\"submit\" value=\"저장\"></form><a href=\"/\">Home</a>";
        return html;
    }

    public String listCategory(ArrayList<Category> data){
        String html = "<form action=\"delete\" method=\"post\">";
        html+="<input type = \"text\" value = \"Category\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>선택</th></tr>";
        for (Category item : data) {
            html+="<tr><td>"+ item.getId() + "</td><td>" + item.getName() + "</td><td><input type=\"radio\" name=\"id\" value=\""+ item.getId() +"\"></td></tr>";
        }
        html+="</table><input type=\"submit\" value=\"삭제\"></form><a href=\"/\">Home</a>";
        return html;
    }
    public String listCategoryTextbox(){
        String html = "<form action=\"\" method=\"post\">";
        html+="<input type = \"text\" value = \"Category\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th></tr>";
        html+="<tr><td><input type=\"text\" name=\"id\"></td><td><input type=\"text\" name=\"name\"></td></tr>";
        html+="</table><input type=\"submit\" value=\"저장\"></form><a href=\"/\">Home</a>";
        return html;
    }

    public String listSubcategory(ArrayList<Subcategory> data){
        String html = "<form action=\"delete\" method=\"post\">";
        html+="<input type = \"text\" value = \"Subcategory\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>Category_id</th><th>선택</th></tr>";
        for (Subcategory item : data) {
            html+="<tr><td>"+ item.getId() + "</td><td>" + item.getName() + "</td><td>" + item.getCategory_id() + "</td><td><input type=\"radio\" name=\"id\" value=\""+ item.getId() +"\"></td></tr>";
        }
        html+="</table><input type=\"submit\" value=\"삭제\"></form><a href=\"/\">Home</a>";
        return html;
    }
    public String listSubcategoryTextbox(){
        String html = "<form action=\"\" method=\"post\">";
        html+="<input type = \"text\" value = \"Subcategory\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>Category_id</th></tr>";
        html+="<tr><td><input type=\"text\" name=\"id\"></td><td><input type=\"text\" name=\"name\"></td><td><input type=\"text\" name=\"category_id\"></td></tr>";
        html+="</table><input type=\"submit\" value=\"저장\"></form><a href=\"/\">Home</a>";
        return html;
    }

    public String listPlace(ArrayList<Place> data){
        String html = "<form action=\"delete\" method=\"post\">";
        html+="<input type = \"text\" value = \"Place\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>Latitude</th><th>Longitude</th><th>City_id</th><th>Address</th><th>Category_id</th><th>Subcategory_id</th><th>Created_at</th><th>Updated_at</th><th>선택</th></tr>";
        for (Place item : data) {
            html+="<tr><td>"+ item.getId() + "</td><td>" + item.getName() + "</td><td>" + item.getLatitude() + "</td><td>" + item.getLongitude() + "</td><td>" + item.getCity_id() + "</td><td>" + item.getAddress() + "</td><td>" + item.getCategory_id() + "</td><td>" + item.getSubcategory_id() + "</td><td>" + item.getCreated_at() + "</td><td>" + item.getUpdated_at() + "</td><td><input type=\"radio\" name=\"id\" value=\""+ item.getId() +"\"></td></tr>";
        }
        html+="</table><input type=\"submit\" value=\"삭제\"></form><a href=\"/\">Home</a>";
        return html;
    }
    public String listPlaceTextbox(){
        String html = "<form action=\"\" method=\"post\">";
        html+="<input type = \"text\" value = \"Place\" name = \"table\" style=\"display: none;\"><table><tr><th>Id</th><th>Name</th><th>Latitude</th><th>Longitude</th><th>City_id</th><th>Address</th><th>Category_id</th><th>Subcategory_id</th></tr>";
        html+="<tr><td><input type=\"text\" name=\"id\"></td><td><input type=\"text\" name=\"name\"></td><td><input type=\"text\" name=\"latitude\"></td><td><input type=\"text\" name=\"longitude\"></td><td><input type=\"text\" name=\"city_id\"></td><td><input type=\"text\" name=\"address\"></td><td><input type=\"text\" name=\"category_id\"></td><td><input type=\"text\" name=\"subcategory_id\"></td></tr>";
        html+="</table><input type=\"submit\" value=\"저장\"></form><a href=\"/\">Home</a>";
        return html;
    }
}
