// GameController.java
package com.cafelcove.streetfinder.controller;

import com.cafelcove.streetfinder.service.GameService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.SendTo;

import com.cafelcove.streetfinder.entity.GameState;
import com.cafelcove.streetfinder.entity.Message;

@Controller
public class GameController {

    // The GameService dependency is injected via constructor injection
    private final GameService gameService;

    // Constructor of GameController, GameService is injected
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // The @MessageMapping annotation ensures that, if a message is sent to "/game.start", this method will be called
    @MessageMapping("/game.start")
    public void startGame(Message message) {
        // Game's current state is checked, and actions are performed based on it
        if (GameState.NOTSET.equals(gameService.getGameState())) {
            gameService.startNewGame();
        } else {
            gameService.joinPreviousGame(message);
        }
    }

    // If a message is sent to "/game.win", this method is called
    @MessageMapping("/game.win")
    public void gameWon(Message message) {
        // Announces a player's victory
        gameService.playerWin(message);
    }

    // This method is called if a message is sent to "/chat.sendMessage"
    // The @SendTo annotation sends the return value of this method to the "/topic/chat"
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat")
    public Message sendMessage(Message message) {
        // The received message is sent back
        return message;
    }
}