package com.cafelcove.streetfinder.csv;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;


import com.cafelcove.streetfinder.dto.TotalDTO;


public class CsvParser {

    // public static void main(String[] args){
    //     CsvParser csvparser = new CsvParser();
    //     csvparser.readCSV();
    // }

    public ArrayList<TotalDTO> readCSV(){
        ArrayList<TotalDTO> csvList = new ArrayList<TotalDTO>();
        
        File csv = new File("D:\\project\\WepGameProject\\streetfinder\\src\\main\\resources\\csv\\testtotal.CSV");
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

    
}
