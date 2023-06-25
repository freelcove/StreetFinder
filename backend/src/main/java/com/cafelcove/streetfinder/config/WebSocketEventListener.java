package com.cafelcove.streetfinder.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.cafelcove.streetfinder.entity.ChatMessage;
import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private GameService gameService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) headerAccessor.getUser();
        User userPrincipal = (User) user.getPrincipal();
        String userId = userPrincipal.getUserId();
        String username = userPrincipal.getUsername();
        String role = userPrincipal.getRole();

        gameService.addUser(username);
        String gameState = gameService.getGameState();
        messagingTemplate.convertAndSendToUser(userId, "/queue/game", gameState);

        // construct chat message for connection
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setType(ChatMessage.MessageType.CONNECT);
        chatMessage.setSender(username);
        // send chat message
        messagingTemplate.convertAndSend("/topic/public", chatMessage);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        if (headerAccessor.getUser() != null) {
            UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) headerAccessor.getUser();
            User userPrincipal = (User) user.getPrincipal();
            String userId = userPrincipal.getUserId();
            String username = userPrincipal.getUsername();
            String role = userPrincipal.getRole();

            gameService.removeUser(username);
            // construct chat message
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatMessage.MessageType.DISCONNECT);
            chatMessage.setSender(username);
            // send chat message
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        } else {
            System.out.println("headerAccessor.getUser() is null");
        }
    }

}