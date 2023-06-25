// GameController.java
package com.cafelcove.streetfinder.controller;

import com.cafelcove.streetfinder.service.GameService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.cafelcove.streetfinder.entity.ChatMessage;

@Controller
public class GameController {

    private final GameService gameService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/game.start")
    public void startGame() {
        System.out.println("Received start game request");
        if ("NOTSET".equals(gameService.getGameState())) {
            gameService.startNewGame();
        } else {
            gameService.joinPreviousGame();
        }
    }

    @MessageMapping("/game.win")
    public void gameWon(ChatMessage chatMessage) {
        gameService.playerWin();

        ChatMessage winMessage = new ChatMessage();
        winMessage.setType(ChatMessage.MessageType.WIN);
        winMessage.setSender(chatMessage.getSender());

        messagingTemplate.convertAndSend("/topic/public", winMessage);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        // gameService.addUser(chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
