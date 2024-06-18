package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.transaction.Transactional;

//Сервис для загрузки пользовательских данных, реализующий интерфейс UserDetailsService.
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Метод для загрузки пользовательских данных по имени пользователя.
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Ищем пользователя по имени пользователя
        return userRepository.findByUsernameWithRoles(email)
                .orElseThrow(() -> new UsernameNotFoundException("User не найден"));
    }
}
