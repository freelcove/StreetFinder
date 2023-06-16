package com.cafelcove.streetfinder.model;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class Subcategory {
    private int subcategory_id;
    private int category_id;
    private String subcategory_name;

    public Subcategory(){}
    
    public Subcategory(String subcategory_id,String category_id, String subcategory_name){
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_name=subcategory_name;
    }

    public Subcategory(int subcategory_id, int category_id, String subcategory_name){
        this.subcategory_id = subcategory_id;
        this.category_id = category_id;
        this.subcategory_name=subcategory_name;
    }

    @Override
    public String toString() {
        String result = "";
        result += "Subcategory_Id : " + subcategory_id + ", Category_Id : " + category_id + ", Subategory_Name : " + subcategory_name + "\n";
        return result;
    }
}
