package ru.kata.spring.boot_security.demo.repository;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserRepositoryCustom {

    void add(User user);

    List<User> getAllUsers();

    User getUser(Long id);

    void deleteUser(Long id);

}
