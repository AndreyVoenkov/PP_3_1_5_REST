package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepositoryCustom;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepositoryCustom userRepositoryCustom;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepositoryCustom userRepositoryCustom, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.userRepositoryCustom = userRepositoryCustom;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public User add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepositoryCustom.add(user);
        return user;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public List<User> getAllUsers() {
        return userRepositoryCustom.getAllUsers();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public User getUser(Long id) {
        return userRepositoryCustom.getUser(id);
    }

    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public void deleteUser(Long id) {
        userRepositoryCustom.deleteUser(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public Optional<User> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("id не должен быть null");
        }
        return userRepository.findById(id);
    }
}

