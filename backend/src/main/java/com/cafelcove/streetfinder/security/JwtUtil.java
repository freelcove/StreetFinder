package com.cafelcove.streetfinder.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
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
            System.out.println("Token is valid");
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token has expired");
        } catch (Exception e) {
            System.out.println("An error occurred while validating token");
            //e.printStackTrace();
        }
        return false;
    }

}
