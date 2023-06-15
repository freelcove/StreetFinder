package com.cafelcove.streetfinder.csv;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

import com.cafelcove.streetfinder.dto.CategoryDTO;
import com.cafelcove.streetfinder.dto.CitiesDTO;
import com.cafelcove.streetfinder.dto.PlacesDTO;
import com.cafelcove.streetfinder.dto.SubcategoryDTO;
import com.cafelcove.streetfinder.dto.TotalDTO;


public class CsvParser {

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
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Cities.CSV 파일 읽는 함수
        public ArrayList<CitiesDTO> readCitiesCSV(){
        ArrayList<CitiesDTO> csvList = new ArrayList<CitiesDTO>();
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
                CitiesDTO data = new CitiesDTO(lineArr[0],lineArr[1]);
                csvList.add(data);
                }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
        return csvList;
    }
        //Category.CSV 파일 읽는 함수
        public ArrayList<CategoryDTO> readCategoryCSV(){
        ArrayList<CategoryDTO> csvList = new ArrayList<CategoryDTO>();
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
                CategoryDTO data = new CategoryDTO(lineArr[0],lineArr[1]);
                csvList.add(data);
                }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Subcategory.CSV 파일 읽는 함수
        public ArrayList<SubcategoryDTO> readSubcategoryCSV(){
        ArrayList<SubcategoryDTO> csvList = new ArrayList<SubcategoryDTO>();
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
                // for (String item : lineArr) {
                //     System.out.println(item);
                // }
                SubcategoryDTO data = new SubcategoryDTO(lineArr[0],lineArr[1],lineArr[2]);
                csvList.add(data);
                }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
        return csvList;
    }

        //Places.CSV 파일 읽는 함수
        public ArrayList<PlacesDTO> readPlacesCSV(){
        ArrayList<PlacesDTO> csvList = new ArrayList<PlacesDTO>();
        String dir = getDir();
        String fileName = "Places.CSV";
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
                PlacesDTO data = new PlacesDTO(lineArr[0],lineArr[1],lineArr[2],lineArr[3],lineArr[4],lineArr[5],lineArr[6],lineArr[7],lineArr[8],lineArr[9]);
                csvList.add(data);
                }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            try {
                if(br != null){
                    br.close();
                }
            } catch (Exception e2) {
                // TODO: handle exception
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    
}
