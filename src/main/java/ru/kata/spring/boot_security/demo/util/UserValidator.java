package ru.kata.spring.boot_security.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserDetailsServiceImpl;


@Component
public class UserValidator implements Validator {

    private final UserDetailsService userDetailsService;

    @Autowired
    public UserValidator(UserDetailsServiceImpl userDetailsServiceImpl) {
        this.userDetailsService = userDetailsServiceImpl;
    }
    // Метод supports проверяет, поддерживает ли данный валидатор валидацию объектов класса User
    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }
    // Метод validate выполняет валидацию объекта target и добавляет ошибки в объект errors
    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        try {
            // Пытаемся загрузить пользователя по имени пользователя
            userDetailsService.loadUserByUsername(user.getUsername());
        } catch (UsernameNotFoundException ignor) {
            // Если пользователь не найден, ничего не делаем и выходим из метода
            return;
        }
        // Если пользователь найден, добавляем ошибку в объект errors
        errors.rejectValue("username", "", "User с таким именем существует");
    }
}
