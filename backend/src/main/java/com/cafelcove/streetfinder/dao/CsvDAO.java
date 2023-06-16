package com.cafelcove.streetfinder.dao;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

import com.cafelcove.streetfinder.dto.PositionDTO;
import com.cafelcove.streetfinder.dto.TotalDTO;
import com.cafelcove.streetfinder.model.Category;
import com.cafelcove.streetfinder.model.Cities;
import com.cafelcove.streetfinder.model.Places;
import com.cafelcove.streetfinder.model.Subcategory;


public class CsvDAO {

    // public static void main(String[] args){
    //     CsvParser csvparser = new CsvParser();
    //     csvparser.readCSV();
    // }

    //현재 CSV 파일이 있는 위치 리턴하는 함수
    public String getDir(){
        String dir = System.getProperty("user.dir");
        dir+="\\src\\main\\resources\\csv\\";
        return dir;
    }

    //testtotal.csv 파일 읽는 함수
    public ArrayList<TotalDTO> readTotalCSV(){
        ArrayList<TotalDTO> csvList = new ArrayList<TotalDTO>();
        String dir = getDir();
        String fileName = "testtotal.CSV";
        dir+=fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";
        
        try {
            br = new BufferedReader(new FileReader(csv,Charset.forName("UTF-8")));
            Boolean checkFirst=true;
            while((line = br.readLine()) !=null){
                if (checkFirst) {
                    checkFirst=false;
                    continue;
                }
                String[] lineArr = line.split(",");
                // for (String item : lineArr) {
                //     System.out.println(item);
                // }
                TotalDTO data = new TotalDTO(lineArr[0],lineArr[1],lineArr[2],lineArr[3],lineArr[4],lineArr[5],lineArr[6],lineArr[7]);
                csvList.add(data);
                }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Cities.CSV 파일 읽는 함수
    public ArrayList<Cities> readCitiesCSV(){
        ArrayList<Cities> csvList = new ArrayList<Cities>();
        String dir = getDir();
        String fileName = "Cities.CSV";
        dir+=fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";
        
        try {
            br = new BufferedReader(new FileReader(csv,Charset.forName("UTF-8")));
            Boolean checkFirst=true;
            while((line = br.readLine()) !=null){
                if (checkFirst) {
                    checkFirst=false;
                    continue;
                }
                String[] lineArr = line.split(",");
                // for (String item : lineArr) {
                //     System.out.println(item);
                // }
                Cities data = new Cities(lineArr[1],lineArr[0]);
                csvList.add(data);
                }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }
        //Category.CSV 파일 읽는 함수
    public ArrayList<Category> readCategoryCSV(){
        ArrayList<Category> csvList = new ArrayList<Category>();
        String dir = getDir();
        String fileName = "Category.CSV";
        dir+=fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";
        
        try {
            br = new BufferedReader(new FileReader(csv,Charset.forName("UTF-8")));
            Boolean checkFirst=true;
            while((line = br.readLine()) !=null){
                if (checkFirst) {
                    checkFirst=false;
                    continue;
                }
                String[] lineArr = line.split(",");
                // for (String item : lineArr) {
                //     System.out.println(item);
                // }
                Category data = new Category(lineArr[1],lineArr[0]);
                csvList.add(data);
                }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Subcategory.CSV 파일 읽는 함수
        public ArrayList<Subcategory> readSubcategoryCSV(){
        ArrayList<Subcategory> csvList = new ArrayList<Subcategory>();
        String dir = getDir();
        String fileName = "Subcategory.CSV";
        dir+=fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";
        
        try {
            br = new BufferedReader(new FileReader(csv,Charset.forName("UTF-8")));
            Boolean checkFirst=true;
            while((line = br.readLine()) !=null){
                if (checkFirst) {
                    checkFirst=false;
                    continue;
                }
                String[] lineArr = line.split(",");
                Subcategory data = new Subcategory(lineArr[2],lineArr[0],lineArr[1]);
                csvList.add(data);
                }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Places.CSV 파일 읽는 함수
    public ArrayList<Places> readPlacesCSV(){
        ArrayList<Places> csvList = new ArrayList<Places>();
        String dir = getDir();
        String fileName = "Places.CSV";
        dir+=fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";
        
        try {
            br = new BufferedReader(new FileReader(csv,Charset.forName("UTF-8")));
            Boolean checkFirst=true;
            GeoDAO geoDAO = new GeoDAO();

            while((line = br.readLine()) !=null){
                if (checkFirst) {
                    checkFirst=false;
                    continue;
                }
                String[] lineArr = line.split(",");
                // for (String item : lineArr) {
                //     System.out.println(item);
                // }
                PositionDTO positionDTO = new PositionDTO();

                //네이버에 위도 경도값 요청
                positionDTO=geoDAO.setPlacesLatitudeLongitude(lineArr[5]);
                Places data = new Places(lineArr[0],lineArr[1],positionDTO.getLatitude(),positionDTO.getLongitude(),lineArr[4],lineArr[5],lineArr[6],lineArr[7],lineArr[8],lineArr[9]);
                csvList.add(data);
                }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    
}
