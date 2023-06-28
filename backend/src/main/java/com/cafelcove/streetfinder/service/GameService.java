// GameService.java
package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;

import com.cafelcove.streetfinder.dto.PlaceDTO;
import com.cafelcove.streetfinder.entity.GameState;
import com.cafelcove.streetfinder.entity.Message;
import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.repository.PlaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {
        private final SimpMessageSendingOperations messagingTemplate;
    private final ObjectMapper objectMapper;
    private final PlaceRepository placeRepository;
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final List<User> users = new CopyOnWriteArrayList<>();
    private GameState gameState = GameState.NOTSET;
    private Map<String, BigDecimal> coordinates;

    public GameService(SimpMessageSendingOperations messagingTemplate, ObjectMapper objectMapper, PlaceRepository placeRepository) {
        this.messagingTemplate = messagingTemplate;
        this.objectMapper = objectMapper;
        this.placeRepository = placeRepository;
    }

    public List<User> getUsers() {
        return users;
    }

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

    public void addUser(User user) {
        users.add(user);
        broadcastChatMessage(Message.MessageType.CONNECT, "/topic/chat", user.getName());

    }

    public void removeUser(User user) {
        users.remove(user);
        broadcastChatMessage(Message.MessageType.DISCONNECT, "/topic/chat", user.getName());

    }

    public void startNewGame() {
        logger.info("Starting new game");
        if (gameState.equals(GameState.NOTSET)) {
            broadcastUsers();
        }
        gameState = GameState.IN_PROGRESS;

        PlaceDTO randomPlace = placeRepository.getRandomPlace();

        coordinates = Map.of("lat", randomPlace.getLatitude(), "lng", randomPlace.getLongitude());

        broadcastGameStateAndCoordinates();
    }

    public void joinPreviousGame(Message message) {
        broadcastUsers();
        broadcastGameStateAndCoordinatesToUser(message);
    }

    public void playerWin(Message message) {
        if (gameState.equals(GameState.IN_PROGRESS)) {
            gameState = GameState.DISPLAYING_RESULTS;

            broadcastChatMessage(Message.MessageType.WIN, "/topic/chat", message.getName());
            broadcastGameState();

            // Transition to next states with delays
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            executorService.schedule(() -> startNewGame(), 15, TimeUnit.SECONDS);
        }
    }

    private void broadcastChatMessage(Message.MessageType type, String destination, String name) {
        Message chatMessage = new Message();
        chatMessage.setType(type);
        chatMessage.setName(name);
        messagingTemplate.convertAndSend(destination, chatMessage);
    }
    
    private void broadcastData(String destination, Map<String, Object> payload) {
        try {
            String broadcastedMessage = objectMapper.writeValueAsString(payload);
            logger.info("Broadcasted message: " + broadcastedMessage);
            messagingTemplate.convertAndSend(destination, broadcastedMessage);
        } catch (Exception e) {
            logger.error("broadcast error: ", e);
        }
    }

    private void broadcastGameState() {
        broadcastData("/topic/game", Map.of("gameState", gameState));
    }

    private void broadcastGameStateAndCoordinates() {
        broadcastData("/topic/game", Map.of("gameState", gameState, "coordinates", coordinates));
    }

    private void broadcastUsers() {
        broadcastData("/topic/game", Map.of("users", users));
    }


    private void broadcastToUser(String userId, Map<String, Object> payload) {
        try {
            String broadcastedMessage = objectMapper.writeValueAsString(payload);
            logger.info("Broadcasted message to user {}: {}", userId, broadcastedMessage);
            messagingTemplate.convertAndSendToUser(userId, "/state", broadcastedMessage);
        } catch (Exception e) {
            logger.error("broadcast error: ", e);
        }
    }

        private void broadcastGameStateAndCoordinatesToUser(Message message) {
        logger.info("Sending game state to user " + message.getId() + ": " + message);
        broadcastToUser(message.getId(), Map.of("gameState", gameState, "coordinates", coordinates));
    }
}