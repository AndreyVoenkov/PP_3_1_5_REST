package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.exception_handling.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class RESTControllerApiAdmin {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RESTControllerApiAdmin(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/showAdmin")
    public User getCurrentUser(Principal principal) {
        return userService.findByUsername(principal.getName());
    }

    @GetMapping("/users")
    public List<User> usersList() {
        return userService.getAllUsers();
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        if (userService.getUserById(id) == null) {
            throw new NoSuchUserException("Пользователь с id: " + id + " не найден");
        }
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody @Valid User user) {
        return userService.add(user);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (userService.getUserById(id) == null) {
            throw new NoSuchUserException("Пользователь с id: " + id + " не найден");
        }
        userService.deleteUser(id);
        return  "Пользователь с id: " + id + " удален";
    }
}