package com.cafelcove.dbcontol.entity;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class Category {
    private int id;
    private String name;

    public Category(){}
    
    public Category(String id, String name){
        this.name = name;
        this.id =Integer.parseInt(id);
    }

    public Category(int id,String name){
        this.name = name;
        this.id =id;
    }

    @Override
    public String toString() {
        String result = "";
        result += "Category_Id : " + id + ", Category_Name : " + name + "\n";
        return result;
    }

}
