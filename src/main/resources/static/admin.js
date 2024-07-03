// Определяем URL для API-запроса текущего администратора
const URLNavbarUser = 'http://localhost:8080/api/admin/showAdmin';

// Получаем элементы DOM для отображения информации о текущем администраторе
const navbarEmail = document.getElementById('navbarEmail');
const navbarRoles = document.getElementById('navbarRoles');
const tableAdmin = document.getElementById('tableAdmin');

// Функция для получения информации о текущем администраторе
function getCurrentUser() {
    // Выполняем GET-запрос к API для получения информации о текущем администраторе
    fetch(URLNavbarUser)
        .then((res) => res.json()) // Преобразуем ответ в формат JSON
        .then((admin) => { // После успешного преобразования
            // Конвертируем роли администратора в строку
            let roles = rolesToStringForUser(admin.roles);
            let data = ''; // Начинаем формирование строки HTML

            // Добавляем строку таблицы с информацией об администраторе
            data += `<tr>
            <td>${admin.id}</td>
            <td>${admin.firstName}</td>
            <td>${admin.lastName}</td>
            <td>${admin.age}</td>
            <td>${admin.email}</td>
            <td>${roles}</td>
            </tr>`;

            // Обновляем содержимое таблицы администраторов
            tableAdmin.innerHTML = data;

            // Обновляем отображение электронной почты текущего администратора
            navbarEmail.innerHTML = `<b><span>${admin.email}</span></b>`;

            // Обновляем отображение ролей текущего администратора
            navbarRoles.innerHTML = `<span>${roles}</span>`;
        });
}

// Вызываем функцию для получения информации о текущем администраторе при загрузке страницы
getCurrentUser();

// Функция для преобразования массива ролей в строку
function rolesToStringForUser(roles) {
    let rolesString = ''; // Начинаем формирование строки ролей
    for (let element of roles) { // Проходимся по каждой роли
        // Добавляем разделитель ', '
        rolesString += (element.name + ', ');
    }
    // Удаляем последний символ ',' из строки
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString; // Возвращаем итоговую строку ролей
}
async function getUserById(id) {
    let response = await fetch("http://localhost:8080/api/admin/users/" + id);
    return await response.json();
}

async function open_fill_modal(form, modal, id) {
    modal.show();
    let user = await getUserById(id);
    form.id.value = user.id;
    form.firstName.value = user.firstName;
    form.lastName.value = user.lastName;
    form.age.value = user.age;
    form.email.value = user.email;
    form.roles.value = user.roles;
}