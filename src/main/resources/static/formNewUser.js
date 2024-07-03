// Получаем форму для создания нового пользователя
let formNewUser = document.forms["formNewUser"];

// Инициализируем функцию для создания нового пользователя
createNewUser();

// Функция для обработки отправки формы создания нового пользователя
function createNewUser() {
    // Добавляем слушатель событий на событие submit формы
    formNewUser.addEventListener("submit", ev => {
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        ev.preventDefault();

        // Создаем массив для хранения ролей выбранных пользователем
        let rolesForNewUser = [];

        // Проходимся по всем опциям в выпадающем списке ролей
        for (let i = 0; i < formNewUser.roles.options.length; i++) {
            // Если опция выбрана, добавляем её в массив rolesForNewUser
            if (formNewUser.roles.options[i].selected)
                rolesForNewUser.push({
                    id: formNewUser.roles.options[i].value,
                    role: "ROLE_" + formNewUser.roles.options[i].text
                });
        }

        // Отправляем запрос на сервер для создания нового пользователя
        fetch("http://localhost:8080/api/admin/users/", {
            method: 'POST', // Метод POST используется для отправки данных на сервер
            headers: { // Заголовки запроса
                'Content-Type': 'application/json' // Указываем, что тело запроса содержит JSON
            },
            body: JSON.stringify({ // Тело запроса
                firstName: formNewUser.firstName.value,
                lastName: formNewUser.lastName.value,
                age: formNewUser.age.value,
                email: formNewUser.email.value,
                password: formNewUser.password.value,
                roles: rolesForNewUser // Передаем массив ролей в теле запроса
            })
        }).then(() => { // После успешной отправки запроса выполняем следующие действия
            // Сбрасываем форму
            formNewUser.reset();
            // Обновляем список всех пользователей
            getAllUsers();
            // Переключаемся на вкладку "Users table"
            var tabEl = document.querySelector('#nav-users_table-tab2');
            var tab = new bootstrap.Tab(tabEl);
            tab.show();
        });
    });
}

// Функция для загрузки ролей для нового пользователя
function loadRolesForNewUser() {
    // Получаем элемент выпадающего списка для ролей
    let selectAdd = document.getElementById("create-roles");

    // Очищаем предыдущие данные из выпадающего списка
    selectAdd.innerHTML = "";

    // Отправляем запрос на сервер для получения списка ролей
    fetch("http://localhost:8080/api/admin/roles")
        .then(res => res.json()) // Преобразуем ответ в JSON
        .then(data => { // После успешного преобразования
            // Проходимся по каждому элементу полученных данных
            data.forEach(role => {
                // Создаем новую опцию для выпадающего списка
                let option = document.createElement("option");
                // Задаем значение и текст для опции
                option.value = role.id;
                option.text = role.name.toString().replace('ROLE_', '');
                // Добавляем опцию в выпадающий список
                selectAdd.appendChild(option);
            });
        })
        .catch(error => console.error(error)); // Логирование ошибок
}

// При загрузке страницы запускаем функцию для загрузки ролей
window.addEventListener("load", loadRolesForNewUser);
