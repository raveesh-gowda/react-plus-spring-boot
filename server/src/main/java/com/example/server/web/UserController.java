package com.example.server.web;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import com.example.server.exception.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.User;
import com.example.server.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
// @CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/user")
@Tag(name = "User Auth", description = "Authenticating a user")
public class UserController {

    UserService userService;

    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "User doesn't exist", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "200", description = "Successful retrieval of user", content = @Content(schema = @Schema(implementation = User.class))),
    })
    @Operation(summary = "Get user by id", description = "Returns a user based on an id")
    @ResponseBody
    public Object findById(@PathVariable Long id) {
        Map<String, Object> object = new HashMap<>();
        object.put("userName", userService.getUser(id).getUsername());
        object.put("age", userService.getUser(id).getAge());
        object.put("dateOfBirth", userService.getUser(id).getDob().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)));

        return new ResponseEntity<>(object, HttpStatus.OK);
    }

    @PostMapping("/register")
    @ApiResponse(responseCode = "404", description = "User doesn't exist", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @Operation(summary = "Register a user", description = "User gets registered")
    // @CrossOrigin(origins = "*")
    public ResponseEntity<HttpStatus> createUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}