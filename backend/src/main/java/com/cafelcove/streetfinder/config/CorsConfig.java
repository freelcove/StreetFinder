package com.cafelcove.streetfinder.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${spring.cors.allowed.origin}")
    private String allowedOrigin;

    /**
     * Configures Cross-Origin Resource Sharing (CORS) from the server's side.
     * CORS is a mechanism that allows many resources (e.g., fonts, JavaScript, etc.)
     * on a web page to be requested from another domain outside the domain from which the resource originated.
     *
     * @param registry CORS registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow web applications from 'allowedOrigin' to access the server's resources.
        // The server can handle all types of HTTP methods and headers from 'allowedOrigin'.
        // Credentials like cookies or HTTP authentication are allowed as well.
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
