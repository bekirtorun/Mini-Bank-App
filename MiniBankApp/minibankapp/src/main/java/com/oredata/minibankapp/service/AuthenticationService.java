package com.oredata.minibankapp.service;

import com.oredata.minibankapp.model.User;
import com.oredata.minibankapp.model.dto.UserDTO;
import com.oredata.minibankapp.model.dto.UserRequestDTO;
import com.oredata.minibankapp.model.dto.UserResponseDTO;
import com.oredata.minibankapp.model.types.Role;
import com.oredata.minibankapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO save(UserDTO userDto) {
        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .email(userDto.getEmail())
                .role(Role.USER).build();
        userRepository.save(user);
        var token = jwtService.generateToken(user);
        return UserResponseDTO.builder().token(token).build();

    }

    public UserResponseDTO auth(UserRequestDTO userRequestDTO) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequestDTO.getUsername(), userRequestDTO.getPassword()));
        User user = userRepository.findByUsername(userRequestDTO.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);
        return UserResponseDTO.builder()
                .token(token)
                .id(user.getId())
                .build();
    }
}
