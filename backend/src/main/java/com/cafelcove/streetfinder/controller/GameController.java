// GameController.java
package com.cafelcove.streetfinder.controller;

import com.cafelcove.streetfinder.service.GameService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.SendTo;

import com.cafelcove.streetfinder.entity.Message;

@Controller
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/game.start")
    public void startGame() {
        if ("NOTSET".equals(gameService.getGameState())) {
            gameService.startNewGame();
        } else {
            gameService.joinPreviousGame();
        }
    }

    @MessageMapping("/game.win")
    public void gameWon(Message message) {
        gameService.playerWin(message);

    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat")
    public Message sendMessage(Message message) {
        return message;
    }
}
