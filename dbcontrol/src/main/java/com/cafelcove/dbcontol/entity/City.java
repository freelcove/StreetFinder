package com.cafelcove.dbcontol.entity;

import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Repository
public class City {
    private int id;
    private String name;

    public City(){}

    public City(String id, String name){
        this.id=Integer.parseInt(id);
        this.name=name;
    }

     public City(int id, String name){
        this.id=id;
        this.name=name;
    }

    @Override
    public String toString() {
        String result = "";
        result += "City_Id : " + id + ", City_Name : " + name + "\n";
        return result;
    }
}
