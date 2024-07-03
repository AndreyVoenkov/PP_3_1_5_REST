package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserDataLoader {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserDataLoader(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    @Transactional
    public void init() {
        // Создание роли ADMIN, если он не существует
        Role adminRole = roleRepository.findByName("ADMIN");
        if (adminRole == null) {
            roleRepository.save(new Role("ADMIN"));
        }

        // Создание роли USER, если он не существует
        Role userRole = roleRepository.findByName("USER");
        if (userRole == null) {
            roleRepository.save(new Role("USER"));
        }

        // Создание пользователя admin, если он не существует
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setFirstName("FirstNameAdmin");
            admin.setLastName("LastNameAdmin");
            admin.setAge(35);
            admin.setEmail("admin@mail.ru");

            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName("ADMIN"));
            roles.add(roleRepository.findByName("USER"));
            admin.setRoles(roles);

            userRepository.save(admin);
        }

        // Создание пользователя user, если он не существует
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user"));
            user.setFirstName("FirstNameUser");
            user.setLastName("LastNameUser");
            user.setAge(30);
            user.setEmail("user@mail.ru");

            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName("USER"));
            user.setRoles(roles);

            userRepository.save(user);
        }
    }
}
