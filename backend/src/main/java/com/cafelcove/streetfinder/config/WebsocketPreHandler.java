package com.cafelcove.streetfinder.config;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.security.JwtUtil;

import org.springframework.security.access.AccessDeniedException;

import java.util.List;

@Component
@RequiredArgsConstructor
public class WebsocketPreHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    /**
     * Intercepts a message pre-send and validates the JWT token in the header
     * @param message the message to be sent
     * @param channel the channel the message is sent through
     * @return the original message or modified message
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            // Extract the Authorization header
            String authorizationHeader = headerAccessor.getFirstNativeHeader("Authorization");

            // Check if the Authorization header is present and starts with "Bearer "
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);

                // Validate the token
                if (jwtUtil.validateToken(token)) {
                    var claims = jwtUtil.getClaims(token);
                    String userId = claims.get("id", String.class);
                    String username = claims.get("username", String.class);
                    String role = claims.get("role", String.class);
                    User userPrincipal = new User(userId, username, role);

                    // Create and set the authentication token in the security context
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null, List.of(new SimpleGrantedAuthority(role)));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    headerAccessor.setUser(authentication);

                    System.out.println("User authenticated successfully");
                } else {
                    System.out.println("JWT token is not valid or missing");
                    throw new AccessDeniedException("Authorization header is missing or does not contain Bearer token");
                }
            } else {
                System.out.println("Authorization header is missing or does not contain Bearer token");
                throw new AccessDeniedException("Authorization header is missing or does not contain Bearer token");
            }
        }

        return message;
    }
}

