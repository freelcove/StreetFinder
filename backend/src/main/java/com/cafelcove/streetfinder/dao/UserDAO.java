package com.cafelcove.streetfinder.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {

    private static final String INSERT_USER_SQL = "INSERT INTO users (username, password) VALUES (?, ?)";
    private static final String FIND_USER_SQL = "SELECT * FROM users WHERE username = ?";

    private final String url;
    private final String username;
    private final String password;

    public UserDAO(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    public void insertUser(String username, String encryptedPassword) throws Exception {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USER_SQL);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, encryptedPassword);
            preparedStatement.executeUpdate();
        }
    }

    public boolean userExists(String username) throws Exception {
        try (Connection connection = DriverManager.getConnection(url, this.username, password)) {
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_USER_SQL);
            preparedStatement.setString(1, username);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                return resultSet.next();
            }
        }
    }

    public boolean testConnection() {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            return connection.isValid(2); // Check if connection is valid, wait up to 2 seconds.
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
