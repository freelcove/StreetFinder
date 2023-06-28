package com.cafelcove.streetfinder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cafelcove.streetfinder.entity.User;
import com.cafelcove.streetfinder.dto.UserUpdateRequestDTO;
import com.cafelcove.streetfinder.service.UserService;

// The @RestController annotation is used to define the RESTful web services. It serves JSON, XML and custom response.
@RestController
// The @RequestMapping annotation is used to define the Request URI to access the REST resources.
@RequestMapping("/api/user")
public class UserController {

    // The UserService dependency is injected via constructor injection
    private final UserService userService;

    // Constructor of UserController, UserService is injected
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // The @PutMapping annotation is used for mapping HTTP PUT requests onto specific handler methods.
    // It is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.PUT).
    // The "{id}" is a URI template. A URI Template is a compact sequence of characters for describing a range of URIs.
    @PutMapping("/{id}")
    // ResponseEntity represents an HTTP response, including headers, body, and status. While @RequestBody used to bind the HTTP request/response body with a domain object in method parameter or return type.
    // @PathVariable is used to extract the values of the template variables and assign their value to a method variable.
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody UserUpdateRequestDTO userUpdateRequestDTO) {
        // Calls the updateUser method from userService
        User updatedUser = userService.updateUser(id, userUpdateRequestDTO);
        // Returns the updatedUser in the response entity
        return ResponseEntity.ok(updatedUser);
    }
}
