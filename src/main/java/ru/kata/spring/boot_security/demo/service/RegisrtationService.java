package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;


import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

/**
 * Сервис для регистрации пользователей.
 * Аннотация @Service указывает, что этот класс является сервисом Spring.
 */
@Service
public class RegisrtationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public RegisrtationService(UserRepository userRepository,
                               PasswordEncoder passwordEncoder,
                               RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    // Метод для регистрации нового пользователя.
    @Transactional
    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Получаем текущий набор ролей пользователя
        Set<Role> roles = user.getRoles();

        // Если набор ролей пуст, инициализируем его
        if (roles == null) {
            roles = new HashSet<>();
        }

        // Проверяем, существует ли роль "ROLE_USER" в базе данных
        Role userRole = roleRepository.findByName("USER");
        if (userRole == null) {
            // Если роль не существует, создаем и сохраняем ее
            roleRepository.save(new Role("USER"));
        }

        // Добавляем роль в набор ролей пользователя
        roles.add(userRole);

        // Устанавливаем обновленный набор ролей пользователю
        user.setRoles(roles);

        // Сохраняем пользователя в репозитории
        userRepository.save(user);
    }

}
