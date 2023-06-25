// GameService.java
package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;

import com.cafelcove.streetfinder.entity.Message;
import com.cafelcove.streetfinder.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private List<String> users = new ArrayList<>();
    private String gameState = "NOTSET";
    private Map<String, Double> coordinates = new HashMap<>();

    public void addUser(User user) {
        String userId = user.getUserId();
        String username = user.getUsername();
        String role = user.getRole();
        users.add(username);
        System.out.println("User added: " + username);

        // construct chat message for connection and send it
        Message chatMessage = new Message();
        chatMessage.setType(Message.MessageType.CONNECT);
        chatMessage.setSender(username);

        messagingTemplate.convertAndSend("/topic/chat", chatMessage);
    }

    public void removeUser(User user) {
        String userId = user.getUserId();
        String username = user.getUsername();
        String role = user.getRole();
        users.remove(username);
        System.out.println("User removed: " + username);

        // construct chat message
        Message chatMessage = new Message();
        chatMessage.setType(Message.MessageType.DISCONNECT);
        chatMessage.setSender(username);
        // send chat message
        messagingTemplate.convertAndSend("/topic/chat", chatMessage);

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

    public double generateRandomCoordinate(double min, double max, int decimalPoint) {
        Random random = new Random();
        double value = min + (max - min) * random.nextDouble();
        double scale = Math.pow(10, decimalPoint);
        return Math.round(value * scale) / scale;
    }

    public void startNewGame() {
        System.out.println("Starting new game");
        gameState = "IN_PROGRESS";

        double lat = generateRandomCoordinate(35.77, 35.98, 7);
        double lng = generateRandomCoordinate(128.43, 128.77, 7);
        coordinates.put("lat", lat);
        coordinates.put("lng", lng);

        broadcastGameState();
    }

    public void joinPreviousGame() {
        System.out.println("joinPreviousGame");
        broadcastGameState();
    }

    public void playerWin(Message message) {
        if ("IN_PROGRESS".equals(gameState)) {
            gameState = "DISPLAYING_RESULTS";

            Message winMessage = new Message();
            winMessage.setType(Message.MessageType.WIN);
            winMessage.setSender(message.getSender());

            messagingTemplate.convertAndSend("/topic/chat", winMessage);
            broadcastGameState();

            // Transition to next states with delays
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            executorService.schedule(() -> startNewGame(), 5, TimeUnit.SECONDS);
        }
    }

    private void broadcastGameStateAndChangeStateToDisplayResults() {
        gameState = "DISPLAYING_RESULTS";
        broadcastGameState();
    }

    private void broadcastGameStateAndChangeStateToInProgress() {
        startNewGame();
        broadcastGameState();
    }

    private void broadcastGameStateToUser(User user) {
        String message = getGameState();
        System.out.println("Sending game state to user " + user.getUserId() + ": " + message);
        try {
            messagingTemplate.convertAndSendToUser(user.getUserId(), "/state", message);
            System.out.println("Game state sent successfully");
        } catch (Exception e) {
            System.out.println("Error sending game state: " + e);
        }

    }

    private void broadcastGameState() {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("gameState", gameState);
            payload.put("users", users);
            payload.put("coordinates", coordinates);
            String message = objectMapper.writeValueAsString(payload);
            System.out.println("Broadcasted message: " + message);
            messagingTemplate.convertAndSend("/topic/game", message);
        } catch (Exception e) {
            System.out.println("broadcast error: " + e);
            // handle the exception
        }
    }
}
