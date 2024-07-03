// Определяем URL для API-запроса списка пользователей
const URLTableUsers = 'http://localhost:8080/api/admin/users';

// Получаем элемент DOM для отображения списка пользователей
const tableUsers = document.getElementById('tableUsers');

// Вызываем функцию для получения списка всех пользователей при загрузке страницы
getAllUsers();

// Функция для получения списка всех пользователей
function getAllUsers() {
    // Выполняем GET-запрос к API для получения списка пользователей
    fetch(URLTableUsers)
        .then(function (res) { // Получаем ответ от сервера
            return res.json(); // Преобразуем ответ в формат JSON
        })
        .then(function(users){ // После успешного преобразования
            let roles = ''; // Начинаем формирование строки ролей
            let data = ''; // Начинаем формирование строки HTML для таблицы

            // Проходимся по каждому пользователю в полученном списке
            for (let user of users) {
                // Конвертируем роли пользователя в строку
                roles = rolesToStringForUsers(user.roles);

                // Добавляем строку таблицы с информацией о пользователе
                data += `<tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${roles}</td>
                <td>
                <button type="button"
                        class="btn btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onclick="editModal(${user.id})">
                                Edit
                            </button>
                </td>
                <td>
                <button type="button" 
                        class="btn btn-danger" 
                        data-bs-toggle="modal" 
                        data-bs-target="#deleteModal" 
                        onclick="deleteModal(${user.id})">Delete</button>
                </td>
                </tr>`;
            }
            // Обновляем содержимое таблицы пользователей
            tableUsers.innerHTML = data;
        })
}

// Вызываем функцию для получения информации о текущем администраторе при загрузке страницы
getCurrentUser();

// Функция для преобразования массива ролей в строку
function rolesToStringForUsers(roles) {
    let rolesString = ''; // Начинаем формирование строки ролей
    for (let element of roles) { // Проходимся по каждой роли
        // Добавляем название роли без префикса 'ROLE_' и разделитель ', '
        rolesString += (element.name.toString().replace('ROLE_', '') + ', ');
    }
    // Удаляем последний символ ',' из строки
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString; // Возвращаем итоговую строку ролей
}
