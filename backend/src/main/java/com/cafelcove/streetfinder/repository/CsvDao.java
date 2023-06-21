package com.cafelcove.streetfinder.repository;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

import com.cafelcove.streetfinder.dto.TotalDTO;
import com.cafelcove.streetfinder.entity.Category;
import com.cafelcove.streetfinder.entity.City;
import com.cafelcove.streetfinder.entity.Place;
import com.cafelcove.streetfinder.entity.Subcategory;

public class CsvDao {

    // public static void main(String[] args){
    // CsvParser csvparser = new CsvParser();
    // csvparser.readCSV();
    // }

    // 현재 CSV 파일이 있는 위치 리턴하는 함수
    public String getDir() {
        String dir = System.getProperty("user.dir");
        dir += "\\src\\main\\resources\\csv\\";
        return dir;
    }

    // testtotal.csv 파일 읽는 함수
    public ArrayList<TotalDTO> readTotalCSV() {
        ArrayList<TotalDTO> csvList = new ArrayList<TotalDTO>();
        String dir = getDir();
        String fileName = "testtotal.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csv, Charset.forName("UTF-8")));
            Boolean checkFirst = true;
            while ((line = br.readLine()) != null) {
                if (checkFirst) {
                    checkFirst = false;
                    continue;
                }
                String[] lineArr = line.split(",");

                TotalDTO data = new TotalDTO(lineArr[0], lineArr[1], lineArr[2], lineArr[3], lineArr[4], lineArr[5],
                        lineArr[6], lineArr[7]);
                csvList.add(data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    // Cities.CSV 파일 읽는 함수
    public ArrayList<City> readCityCSV() {
        ArrayList<City> csvList = new ArrayList<City>();
        String dir = getDir();
        String fileName = "City.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csv, Charset.forName("UTF-8")));
            Boolean checkFirst = true;
            while ((line = br.readLine()) != null) {
                if (checkFirst) {
                    checkFirst = false;
                    continue;
                }
                String[] lineArr = line.split(",");

                City data = new City(lineArr[1], lineArr[0]);
                csvList.add(data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    // Category.CSV 파일 읽는 함수
    public ArrayList<Category> readCategoryCSV() {
        ArrayList<Category> csvList = new ArrayList<Category>();
        String dir = getDir();
        String fileName = "Category.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csv, Charset.forName("UTF-8")));
            Boolean checkFirst = true;
            while ((line = br.readLine()) != null) {
                if (checkFirst) {
                    checkFirst = false;
                    continue;
                }
                String[] lineArr = line.split(",");

                Category data = new Category(lineArr[1], lineArr[0]);
                csvList.add(data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    // Subcategory.CSV 파일 읽는 함수
    public ArrayList<Subcategory> readSubcategoryCSV() {
        ArrayList<Subcategory> csvList = new ArrayList<Subcategory>();
        String dir = getDir();
        String fileName = "Subcategory.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csv, Charset.forName("UTF-8")));
            Boolean checkFirst = true;
            while ((line = br.readLine()) != null) {
                if (checkFirst) {
                    checkFirst = false;
                    continue;
                }
                String[] lineArr = line.split(",");
                Subcategory data = new Subcategory(lineArr[2], lineArr[1], lineArr[0]);
                csvList.add(data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    // Places.CSV 파일 읽는 함수
    public ArrayList<Place> readPlaceCSV() {
        ArrayList<Place> csvList = new ArrayList<Place>();
        String dir = getDir();
        String fileName = "Place.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new FileReader(csv, Charset.forName("UTF-8")));
            Boolean checkFirst = true;
            // GeoDao geoDAO = new GeoDao();

            while ((line = br.readLine()) != null) {
                if (checkFirst) {
                    checkFirst = false;
                    continue;
                }
                String[] lineArr = line.split(",");
                if (lineArr[2] != null && lineArr[3] != null) {
                    Place data = new Place(lineArr[0], lineArr[1], Float.parseFloat(lineArr[2]),
                            Float.parseFloat(lineArr[3]),
                            lineArr[4], lineArr[5], lineArr[6], lineArr[7]);
                    csvList.add(data);
                } else {
                    Place data = new Place(lineArr[0], lineArr[1], Float.parseFloat("-1"), Float.parseFloat("-1"),
                            lineArr[4], lineArr[5], lineArr[6], lineArr[7]);
                    csvList.add(data);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return csvList;
    }

    public void writePlacesCSV(ArrayList<Place> place) {
        String dir = getDir();
        String fileName = "Place.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(csv, Charset.forName("UTF-8"), false));
            String head = "Id, Name, Latitude, Longitude, City_id, Address, Category_id, Subcategory_id, Created_at, Updated_at";
            bw.write(head);
            bw.newLine();
            for (Place data : place) {
                String aData = "";
                aData = data.getId() + "," + data.getName() + "," + data.getLatitude() + "," + data.getLongitude() + ","
                        + data.getCity_id() + "," + data.getAddress() + "," + data.getCategory_id() + ","
                        + data.getSubcategory_id() + "," + data.getCreated_at() + "," + data.getUpdated_at();
                bw.write(aData);
                bw.newLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush();
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void writeCityCSV(ArrayList<City> city) {
        String dir = getDir();
        String fileName = "City.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(csv, Charset.forName("UTF-8"), false));
            String head = "Name, Id";
            bw.write(head);
            bw.newLine();
            for (City data : city) {
                String aData = "";
                aData = data.getName() + "," + data.getId();
                bw.write(aData);
                bw.newLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush();
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void writeCategoryCSV(ArrayList<Category> category) {
        String dir = getDir();
        String fileName = "Category.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(csv, Charset.forName("UTF-8"), false));
            String head = "Name, Id";
            bw.write(head);
            bw.newLine();
            for (Category data : category) {
                String aData = "";
                aData = data.getName() + "," + data.getId();
                bw.write(aData);
                bw.newLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush();
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void writeSubcategoryCSV(ArrayList<Subcategory> subcategory) {
        String dir = getDir();
        String fileName = "Subcategory.CSV";
        dir += fileName;
        File csv = new File(dir);
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(csv, Charset.forName("UTF-8"), false));
            String head = "Category_id, Name, Id";
            bw.write(head);
            bw.newLine();
            for (Subcategory data : subcategory) {
                String aData = "";
                aData = data.getCategory_id() + "," + data.getName() + "," + data.getId();
                bw.write(aData);
                bw.newLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush();
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
