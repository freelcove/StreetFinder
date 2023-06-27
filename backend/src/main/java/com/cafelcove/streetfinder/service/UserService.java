package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;

import com.cafelcove.streetfinder.dto.UserUpdateRequestDTO;
import com.cafelcove.streetfinder.entity.User;

import org.springframework.dao.EmptyResultDataAccessException;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Service
public class UserService {
    private final DataSource dataSource;

    public UserService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public User updateUser(String id, UserUpdateRequestDTO userUpdateRequestDTO) {
        User user = new User();
        try (Connection connection = dataSource.getConnection()) {
            String query = "UPDATE User SET name=?, color=? WHERE id=?";
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, userUpdateRequestDTO.getName());
                statement.setString(2, userUpdateRequestDTO.getColor());
                statement.setString(3, id);
                int rowsAffected = statement.executeUpdate();
                if (rowsAffected > 0) {
                    user.setId(id);
                    user.setName(userUpdateRequestDTO.getName());
                    user.setColor(userUpdateRequestDTO.getColor());
                } else {
                    throw new SQLException("Update failed, no rows affected.");
                }
            }
        } catch (SQLException e) {
            throw new EmptyResultDataAccessException("Error updating user", 1, e);
        }
        return user;
    }
}
