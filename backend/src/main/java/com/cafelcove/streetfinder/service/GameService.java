// GameService.java
package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;

import com.cafelcove.streetfinder.controller.ApiConnection;
import com.cafelcove.streetfinder.dto.PositionDTO;
import com.cafelcove.streetfinder.dto.PositionDataDTO;
import com.cafelcove.streetfinder.entity.Message;
import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.repository.GetPositionDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.cj.xdevapi.JsonArray;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

    public PositionDataDTO connPositionDataDTO(){
        PositionDataDTO data = new PositionDataDTO();
        try {
            String apiURL = "http://localhost:8080/api/position/each";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int responseCode = con.getResponseCode();

            BufferedReader br;

            if(responseCode == 200){
                br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();

            while((inputLine = br.readLine()) != null){
                response.append(inputLine);
            }

            br.close();

            JSONTokener tokener = new JSONTokener(response.toString());
            JSONObject object= new JSONObject(tokener);
            JSONArray arr = object.getJSONArray("data");
            List<PositionDTO> input = new ArrayList<PositionDTO>();
            for(int i = 0; i<arr.length(); i++){
                JSONObject temp = (JSONObject) arr.get(i);
                PositionDTO positionDTO = new PositionDTO(String.valueOf(temp.get("place_id")),(String) temp.get("place_name"),
                String.valueOf(temp.get("lat")), String.valueOf(temp.get("lng")), String.valueOf(temp.get("visits")));
                System.out.println(temp);
                System.out.println(temp.get("place_id"));
                System.out.println(temp.get("place_name"));
                System.out.println(temp.get("lat"));
                System.out.println(temp.get("lng"));
                System.out.println(temp.get("visits"));

                input.add(positionDTO);
            }
            data.setData(input);
            for (PositionDTO item : data.getData()) {
                System.out.println(item.getPlace_name());
                System.out.println(item.getPlace_id());
                System.out.println(item.getLat());
                System.out.println(item.getLng());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return data;
    }

    public void startNewGame() {
        System.out.println("Starting new game");
        gameState = "IN_PROGRESS";
        PositionDataDTO data = new PositionDataDTO();
        data = connPositionDataDTO();
        for (PositionDTO item : data.getData()) {
            System.out.println(item.getLat());
            System.out.println(item.getLng());
        }
        double lat = Math.floor(data.getData().get(0).getLat()*100000)/100000.0;
        double lng = Math.floor(data.getData().get(0).getLng()*100000)/100000.0;
        coordinates.put("lat", lng);
        coordinates.put("lng", lat);
        System.out.println(lat + ", " +lng);

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
