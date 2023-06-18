package com.cafelcove.streetfinder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        // Create a JSON object
        String json = "{\"message\":\"Hello, World!\"}";

        // Return the JSON object
        return json;
    }
}