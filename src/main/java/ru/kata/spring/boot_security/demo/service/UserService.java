package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User add(User user);

    List<User> getAllUsers();

    User getUser(Long id);

    void deleteUser(Long id);

    Optional<User> findById(Long id);
}
