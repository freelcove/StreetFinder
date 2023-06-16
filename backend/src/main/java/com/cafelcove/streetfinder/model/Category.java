package com.cafelcove.streetfinder.model;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class Category {
    private int category_id;
    private String category_name;

    public Category(){}
    
    public Category(String category_id, String category_name){
        this.category_name = category_name;
        this.category_id =Integer.parseInt(category_id);
    }

    public Category(int category_id,String category_name){
        this.category_name = category_name;
        this.category_id =category_id;
    }

    @Override
    public String toString() {
        String result = "";
        result += "Category_Id : " + category_id + ", Category_Name : " + category_name + "\n";
        return result;
    }

}
