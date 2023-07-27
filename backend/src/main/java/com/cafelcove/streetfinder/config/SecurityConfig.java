package com.cafelcove.streetfinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cafelcove.streetfinder.security.AuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private static final String[] WHITE_LIST = {
            "/warmup",
            "/ws/**",
            
    };

    @Bean
    public AuthenticationFilter AuthenticationFilter() {
        return new AuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("*").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
