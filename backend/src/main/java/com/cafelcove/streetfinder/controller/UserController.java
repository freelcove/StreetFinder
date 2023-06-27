package com.cafelcove.streetfinder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.dto.UserUpdateRequestDTO;
import com.cafelcove.streetfinder.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody UserUpdateRequestDTO userUpdateRequestDTO) {
        User updatedUser = userService.updateUser(id, userUpdateRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }
}
