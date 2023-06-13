package com.cafelcove.streetfinder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarmupController {

    @GetMapping("/warmup")
    public String warmup() {
        return "Backend is warmed up!";
    }
}