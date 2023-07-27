package com.cafelcove.streetfinder.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebsocketPreHandler websocketPreHandler;

    @Value("${spring.cors.allowed.origin}")
    private String allowedOrigin;

    /**
     * Register STOMP endpoints and set allowed origins
     * @param registry registry to add endpoint to
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Registering the "/ws" endpoint that the WebSocket clients will connect to.
        // Setting the allowed origin patterns to ensure only specified origins can connect to our WebSocket.
        // Enabling SockJS fallback options
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    /**
     * Configure the message broker
     * @param registry registry to configure
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Setting prefix for messages that are bound for @MessageMapping methods.
        // Enable the "/user" and "/topic" prefixes to designate which messages are to be directed to the broker (i.e., relayed to other connected clients).
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/user", "/topic");
        registry.setUserDestinationPrefix("/user");
    }

    /**
     * Adding interceptors for in-bound messages
     * @param registration registration to add interceptors to
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // Adding our custom pre-handler
        registration.interceptors(websocketPreHandler);
    }
}
