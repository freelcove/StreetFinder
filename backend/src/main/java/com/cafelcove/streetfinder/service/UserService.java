package com.cafelcove.streetfinder.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cafelcove.streetfinder.dto.UserUpdateRequestDTO;
import com.cafelcove.streetfinder.entity.User;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Service
public class UserService {
    private final JdbcTemplate jdbcTemplate;

    // Define SQL statements as constants
    private static final String UPDATE_USER_SQL = "UPDATE User SET name=?, color=? WHERE id=?";

    public UserService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Transactional // Ensuring the operation is performed within a transaction
    public User updateUser(String id, UserUpdateRequestDTO userUpdateRequestDTO) {
        User user = new User();
        // Using JdbcTemplate to simplify JDBC operations
        int rowsAffected = jdbcTemplate.update(
                UPDATE_USER_SQL,
                userUpdateRequestDTO.getName(),
                userUpdateRequestDTO.getColor(),
                id
        );

        if (rowsAffected > 0) {
            user.setId(id);
            user.setName(userUpdateRequestDTO.getName());
            user.setColor(userUpdateRequestDTO.getColor());
        } else {
            throw new EmptyResultDataAccessException("Update failed, no rows affected.", 1);
        }

        return user;
    }
}
