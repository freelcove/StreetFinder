package com.cafelcove.streetfinder.controller;

import com.cafelcove.streetfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class DbTestController {

    @Autowired
    private UserService userService;

    @GetMapping("/db")
    public String testDatabaseConnection() {
        return userService.testConnection() ? "Database connected!" : "Failed to connect to database!";
    }
}
