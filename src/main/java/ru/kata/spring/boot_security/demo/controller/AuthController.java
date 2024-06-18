package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RegisrtationService;
import ru.kata.spring.boot_security.demo.util.UserValidator;

import javax.validation.Valid;


/**
 * Контроллер для обработки запросов аутентификации и регистрации пользователей.
 * Аннотация @RequestMapping("/") указывает базовый URL для всех методов в этом контроллере.
 */
@Controller
@RequestMapping("/")
public class AuthController {

    private final UserValidator userValidator;
    private final RegisrtationService registrationService;

    @Autowired
    public AuthController(UserValidator userValidator,
                          RegisrtationService registrationService) {
        this.userValidator = userValidator;
        this.registrationService = registrationService;
    }

    @GetMapping("/login")
    public String LoginPage() {
        return "/login";
    }

    @GetMapping("/registration")
    public String registrationPage(@ModelAttribute("user") User user) {
        return "/registration";
    }

    /**
     * Обрабатывает POST-запросы на URL "/registration".
     * Выполняет валидацию данных пользователя и регистрацию.
     * Если есть ошибки валидации, возвращает страницу регистрации с ошибками.
     * В случае успешной регистрации перенаправляет на страницу входа.
     */
    @PostMapping("/registration")
    public String performRegistration(@ModelAttribute("user")
                                      @Valid User user,
                                      BindingResult bindingResult) {

        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "/registration";
        }

        registrationService.register(user);

        return "redirect:/login";
    }
}
