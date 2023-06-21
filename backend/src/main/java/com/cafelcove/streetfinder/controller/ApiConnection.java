package com.cafelcove.streetfinder.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafelcove.streetfinder.dto.PositionDTO;
import com.cafelcove.streetfinder.dto.PositionDataDTO;
import com.cafelcove.streetfinder.repository.GetPositionDAO;

@RestController
@RequestMapping("/api")
public class ApiConnection {

    @Value("${spring.datasource.url}")
    private String dbUrl;
    @Value("${spring.datasource.username}")
    private String dbId;
    @Value("${spring.datasource.password}")
    private String dbPw;

    @GetMapping(value = "/position/each")
    public PositionDataDTO eachPosition() {
        System.out.println("Catch the connection try");
        List<PositionDTO> data = new ArrayList<PositionDTO>();
        PositionDataDTO result = new PositionDataDTO();
        GetPositionDAO dao = new GetPositionDAO();
        data.add(dao.getPosition(dbUrl, dbId, dbPw));
        if (data != null) {
            result.setResult("Sucess");
            result.setData(data);
        }
        System.out.println(result);
        return result;
    }

    @GetMapping(value = "/position/multiple/{variable}")
    public PositionDataDTO multiplePosition(@PathVariable String variable){
        System.out.println("Catch the connection try");
        List<PositionDTO> data = new ArrayList<PositionDTO>();
        PositionDataDTO result = new PositionDataDTO();
        GetPositionDAO dao = new GetPositionDAO();
        int count = Integer.parseInt(variable);
        int i = 0;
        while(i<count){
            data.add(dao.getPosition(dbUrl, dbId, dbPw));
            if(data.get(i)==null){
                i--;
            } else {
                i++;
            }
        }
        if(data!=null){
            result.setResult("Sucess");
            result.setData(data);
        }
        System.out.println(result);
        return result;
    }

}
