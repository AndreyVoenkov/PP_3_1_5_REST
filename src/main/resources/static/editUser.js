// Получаем форму для редактирования пользователя
let formEdit = document.forms["formEdit"];

// Вызываем функцию для открытия модального окна редактирования пользователя
editUser();

// Асинхронная функция для открытия модального окна редактирования пользователя
async function editModal(id) {
    // Создаем новый экземпляр Modal из Bootstrap для модального окна редактирования
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));

    // Открываем модальное окно и заполняем его данными пользователя для редактирования
    await open_fill_modal(formEdit, modalEdit, id);

    // Загружаем роли для выбора в форме редактирования
    loadRolesForEdit();
}

// Функция для обработки отправки формы редактирования пользователя
function editUser() {
    // Добавляем слушатель событий на событие submit формы
    formEdit.addEventListener("submit", ev => {
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        ev.preventDefault();

        // Создаем массив для хранения ролей, выбранных для редактирования
        let rolesForEdit = [];

        // Проходимся по всем опциям в выпадающем списке ролей
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            // Если опция выбрана, добавляем её в массив rolesForEdit
            if (formEdit.roles.options[i].selected)
                rolesForEdit.push({
                    id: formEdit.roles.options[i].value,
                    role: formEdit.roles.options[i].text
                });
        }

        // Отправляем запрос на сервер для редактирования пользователя
        fetch("http://localhost:8080/api/admin/users/" + formEdit.id.value, {
            method: 'PUT', // Метод PUT используется для частичного обновления ресурса
            headers: { // Заголовки запроса
                'Content-Type': 'application/json' // Указываем, что тело запроса содержит JSON
            },
            body: JSON.stringify({ // Тело запроса
                id: formEdit.id.value,
                firstName: formEdit.firstName.value,
                lastName: formEdit.lastName.value,
                age: formEdit.age.value,
                email: formEdit.email.value,
                password: formEdit.password.value,
                roles: rolesForEdit // Передаем массив ролей в теле запроса
            })
        }).then(() => { // После успешной отправки запроса выполняем следующие действия
            // Закрываем модальное окно
            const modalEdit = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            // Закрываем модальное окно
            modalEdit.hide();
            // Обновляем список всех пользователей
            getAllUsers();
        });
    });
}

// Функция для загрузки ролей для выбора в форме редактирования
function loadRolesForEdit() {
    // Получаем элемент выпадающего списка для ролей
    let selectEdit = document.getElementById("edit-roles");

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
                option.text = role.name;
                // Добавляем опцию в выпадающий список
                selectEdit.appendChild(option);
            });
        })
        .catch(error => console.error(error)); // Логирование ошибок
}

// Обработчик события для корректного удаления темного фона после закрытия модального окна
document.addEventListener('DOMContentLoaded', function () {
    $('#editModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    });
});

// При загрузке страницы запускаем функцию для загрузки ролей
window.addEventListener("load", loadRolesForEdit);
