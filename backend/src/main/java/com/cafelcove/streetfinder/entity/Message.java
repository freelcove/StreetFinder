package com.cafelcove.streetfinder.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {

    private MessageType type;
    private String content;
    private String userId;
    private String username;

    public enum MessageType {

        CHAT,
        JOIN,
        LEAVE,
        CONNECT,
        DISCONNECT,
        WIN
    }

}