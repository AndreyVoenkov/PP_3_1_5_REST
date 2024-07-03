// Определяем URL для API-запроса текущего пользователя
const URLNavbarUser = 'http://localhost:8080/api/user/showUser';

// Получаем элементы DOM для отображения информации о текущем пользователе
const navbarEmail = document.getElementById('navbarEmail');
const navbarRoles = document.getElementById('navbarRoles');
const tableUser = document.getElementById('tableUser');

// Функция для получения информации о текущем пользователе
function getCurrentUser() {
    // Выполняем GET-запрос к API для получения информации о текущем пользователе
    fetch(URLNavbarUser)
        .then((res) => res.json()) // Преобразуем ответ в формат JSON
        .then((user) => { // После успешного преобразования
            // Конвертируем роли пользователя в строку
            let roles = rolesToStringForUser(user.roles);
            let data = ''; // Начинаем формирование строки HTML

            // Добавляем строку таблицы с информацией о пользователе
            data += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${roles}</td>
            </tr>`;

            // Обновляем содержимое таблицы пользователя
            tableUser.innerHTML = data;

            // Обновляем отображение электронной почты текущего пользователя
            navbarEmail.innerHTML = `<b><span>${user.email}</span></b>`;

            // Обновляем отображение ролей текущего пользователя
            navbarRoles.innerHTML = `<span>${roles}</span>`;
        });
}

// Вызываем функцию для получения информации о текущем пользователе при загрузке страницы
getCurrentUser();

// Функция для преобразования массива ролей в строку
function rolesToStringForUser(roles) {
    let rolesString = ''; // Начинаем формирование строки ролей
    for (let element of roles) { // Проходимся по каждой роли
        rolesString += (element.name + '  ');
    }
    // Удаляем последний символ ',' из строки
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString; // Возвращаем итоговую строку ролей
}
