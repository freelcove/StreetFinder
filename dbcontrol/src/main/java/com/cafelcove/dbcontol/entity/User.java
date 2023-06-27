package com.cafelcove.dbcontol.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String id;
    private String password;
    private String name;
    private String email;
    private String email_verified;
    private String image;

}
