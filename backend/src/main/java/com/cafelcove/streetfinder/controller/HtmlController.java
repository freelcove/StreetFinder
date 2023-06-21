package com.cafelcove.streetfinder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HtmlController {
    
    @RequestMapping(value="/home")
    public String requestMethodName() {
        return "/home.html";
    }

    @GetMapping(value="/dbcontroller/insertAll")
    public String insertController(){
        return "/insertAll.html";
    }

    @GetMapping(value = "/dbcontroller/delete")
    public String deleteController(){
        return "/delete.html";
    }
    
    @GetMapping(value = "/dbcontroller/read")
    public String readController(){
        return "/read.html";
    }

    @GetMapping(value = "/dbcontroller/update")
    public String updateController(){
        return "/update.html";
    }

    @GetMapping(value = "/csvcontroller/csvinsertAll")
    public String insertCsvController(){
        return "/csvinsertAll.html";
    }
}
