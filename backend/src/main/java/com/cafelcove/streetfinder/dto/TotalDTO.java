package com.cafelcove.streetfinder.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TotalDTO {

    private int rank;
    private String placename;
    private String city;
    private String state;
    private String streetadress;
    private String maincategory;
    private String detailcategory;
    private int count;

    public TotalDTO(){}

    public TotalDTO(String rank,String placename,String city,String state,String streetadress,String maincategory,String detailcategory,String count){
  
        this.rank=Integer.parseInt(rank);
        this.placename=placename;
        this.city=city;
        this.state=state;
        this.streetadress=streetadress;
        this.maincategory=maincategory;
        this.detailcategory=detailcategory;
        this.count=Integer.parseInt(count);
    }

    @Override
    public String toString() {
        String result = getRank() + ", " + getCity()+ ", " +getCount()+ ", " +getDetailcategory()+ ", " +getMaincategory()+ ", " +getPlacename()+ ", " +getState()+ ", " +getStreetadress() +"<br>"; 
        return result;
    }

}
