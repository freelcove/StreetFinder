package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {
    private int category_id;
    private String category_name;

    public CategoryDTO(){}
    
    public CategoryDTO(String category_name, String category_id){
        this.category_name = category_name;
        this.category_id =Integer.parseInt(category_id);
    }

    @Override
    public String toString() {
        String result = "";
        result += "Category_Id : " + category_id + ", Category_Name : " + category_name + "\n";
        return result;
    }

}
