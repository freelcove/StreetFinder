package com.cafelcove.streetfinder.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${spring.jwt.secret}")
    private String JWT_SECRET;

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET.getBytes()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
