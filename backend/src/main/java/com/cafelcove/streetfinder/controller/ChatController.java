package com.cafelcove.streetfinder.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        return message;
    }
}
