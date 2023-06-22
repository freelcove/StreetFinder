package com.cafelcove.streetfinder.entity;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class Subcategory {
    private int id;
    private String name;
    private int category_id;

    public Subcategory(){}
    
    public Subcategory(String id, String name ,String category_id){
        this.id = Integer.parseInt(id);
        this.category_id = Integer.parseInt(category_id);
        this.name=name;
    }

    public Subcategory(int id, String name, int category_id){
        this.id = id;
        this.category_id = category_id;
        this.name=name;
    }

    @Override
    public String toString() {
        String result = "";
        result += "Id : " + id + ", Category_Id : " + category_id + ", Name : " + name + "\n";
        return result;
    }
}
