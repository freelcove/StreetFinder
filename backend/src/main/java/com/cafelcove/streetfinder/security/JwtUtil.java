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

    /**
     * Extracts the claims from a JWT.
     * 
     * A claim is a piece of information asserted about a subject and is represented as a name/value pair.
     * Claims are incorporated in the JWT, and can be used in the application to make decisions about authorization etc.
     * 
     * @param token JWT string
     * @return Claims object that can be used to retrieve individual claims
     */
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Validates a JWT.
     * 
     * This is done by parsing the token and catching any potential exceptions that might be thrown,
     * such as an ExpiredJwtException, which is thrown if the token has expired.
     * 
     * @param token JWT string
     * @return true if token is valid, false otherwise
     */
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
