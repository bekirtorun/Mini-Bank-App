package com.oredata.minibankapp.controller;


import com.oredata.minibankapp.model.dto.UserDTO;
import com.oredata.minibankapp.model.dto.UserDetailsDTO;
import com.oredata.minibankapp.model.dto.UserRequestDTO;
import com.oredata.minibankapp.model.dto.UserResponseDTO;
import com.oredata.minibankapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserManagementController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserDTO userDto) {
        return ResponseEntity.ok(authenticationService.save(userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestDTO userRequest) {
        return ResponseEntity.ok(authenticationService.auth(userRequest));
    }



}
