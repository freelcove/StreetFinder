// GameService.java
package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {

    @Autowired
    private ObjectMapper objectMapper;

    private final SimpMessagingTemplate template;
    private List<String> users = new ArrayList<>();
    private String gameState = "NOTSET";

    public GameService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void addUser(String username) {
        users.add(username);
        System.out.println("User added: " + username);  // Add this line
        broadcastGameState();
    }

    public void removeUser(String username) {
        users.remove(username);
        System.out.println("User removed: " + username);  // Add this line
        broadcastGameState();
    }


    public List<String> getUsers() {
        return users;
    }

    public String getGameState() {
        return gameState;
    }

    public void setGameState(String gameState) {
        this.gameState = gameState;
    }

    public void startNewGame() {
        System.out.println("Starting new game");
        gameState = "IN_PROGRESS";
        broadcastGameState();
    }

    public void joinPreviousGame() {
        System.out.println("joinPreviousGame");
        broadcastGameState();
    }

    public void playerWin() {
        if ("IN_PROGRESS".equals(gameState)) {
            gameState = "ENDGAME";
            broadcastGameState();

            // Transition to next states with delays
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            executorService.schedule(this::broadcastGameStateAndChangeStateToDisplayResults, 5, TimeUnit.SECONDS);
            executorService.schedule(this::broadcastGameStateAndChangeStateToInProgress, 10, TimeUnit.SECONDS);
        }
    }

    private void broadcastGameStateAndChangeStateToDisplayResults() {
        gameState = "DISPLAYING_RESULTS";
        broadcastGameState();
    }

    private void broadcastGameStateAndChangeStateToInProgress() {
        gameState = "IN_PROGRESS";
        broadcastGameState();
    }

    private void broadcastGameState() {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("gameState", gameState);
            payload.put("users", users);
            String message = objectMapper.writeValueAsString(payload);
            System.out.println("Broadcasted message: " + message);
            template.convertAndSend("/topic/game", message);
        } catch (Exception e) {
            System.out.println("broadcast error: " + e);
            // handle the exception
        }
    }
}
