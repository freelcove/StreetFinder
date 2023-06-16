package com.cafelcove.streetfinder.service;

import com.cafelcove.streetfinder.dao.UserDAO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserDAO userDAO;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    public UserService() {
        // Initialize UserDAO here
        this.userDAO = new UserDAO(dbUrl, dbUsername, dbPassword);
    }

    public void registerNewUser(String username, String password) throws Exception {
        if (!userDAO.userExists(username)) {
            String encryptedPassword = passwordEncoder.encode(password);
            userDAO.insertUser(username, encryptedPassword);
        } else {
            throw new Exception("User already exists");
        }
    }

    public boolean testConnection() {
        return userDAO.testConnection();
    }
}
