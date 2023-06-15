package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubcategoryDTO {
    private int subcategory_id;
    private int category_id;
    private String subcategory_name;

    public SubcategoryDTO(){}
    
    public SubcategoryDTO(String category_id,String subcategory_name, String subcategory_id){
        this.subcategory_id = Integer.parseInt(subcategory_id);
        this.category_id = Integer.parseInt(category_id);
        this.subcategory_name=subcategory_name;
    }
    @Override
    public String toString() {
        String result = "";
        result += "Subcategory_Id : " + subcategory_id + ", Category_Id : " + category_id + ", Subategory_Name : " + subcategory_name + "\n";
        return result;
    }
}
