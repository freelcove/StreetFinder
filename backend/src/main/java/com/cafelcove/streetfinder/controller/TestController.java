package com.cafelcove.streetfinder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    public static class Greeting {
        private String message;

        public Greeting(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @GetMapping("/hello")
    public Greeting hello() {
        return new Greeting("Hello from backend");
    }

    @GetMapping("/practice_start")
    public Greeting hello() {
        서비스에 있는 코드 실행 -> dao로 db 접근 -> dto로 좌표만 받음
        return 랜덤한 좌표;

    @GetMapping("/practice_result")
    public Greeting hello() {
        좌표 2개 받아서
        
        return 거리 계산);
    }
}
