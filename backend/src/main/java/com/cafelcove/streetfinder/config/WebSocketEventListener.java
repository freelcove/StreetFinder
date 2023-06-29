package com.cafelcove.streetfinder.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {


    @Autowired
    private GameService gameService;

    /**
     * Event listener for websocket connection
     * @param event the connected event
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        User user = getUserFromEvent(event);
        if (user != null) {
            gameService.addUser(user);
        }
    }

    /**
     * Event listener for websocket disconnection
     * @param event the disconnect event
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        User user = getUserFromEvent(event);
        if (user != null) {
            gameService.removeUser(user);
            System.out.println(user + " disconnected.");
        }
    }

        private User getUserFromEvent(AbstractSubProtocolEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        if (headerAccessor.getUser() != null) {
            UsernamePasswordAuthenticationToken userToken = (UsernamePasswordAuthenticationToken) headerAccessor.getUser();
            return (User) userToken.getPrincipal();
        }
        return null;
    }

}
