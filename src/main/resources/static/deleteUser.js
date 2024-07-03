// Получаем форму для редактирования пользователя
let formDelete = document.forms["formDelete"]

// Вызываем функцию для открытия модального окна редактирования пользователя
deleteUser();

// Асинхронная функция для открытия модального окна удаления пользователя
async function deleteModal(id) {
    // Создаем новый экземпляр Modal из Bootstrap для модального окна удаления
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));

    // Открываем модальное окно и заполняем его данными пользователя для удаления
    await open_fill_modal(formDelete, modalDelete, id);

    // Загружаем роли для выбора в форме удаления
    loadRolesForDelete();
}

// Функция для обработки отправки формы удаления пользователя
function deleteUser() {
    // Добавляем слушатель событий на событие submit формы
    formDelete.addEventListener("submit", ev => {
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        ev.preventDefault();

// Создаем массив для хранения ролей, выбранных для редактирования
        let rolesForDelete = [];

        // Проходимся по всем опциям в выпадающем списке ролей
        for (let i = 0; i < formDelete.roles.options.length; i++) {
            // Если опция выбрана, добавляем её в массив rolesForEdit
            if (formDelete.roles.options[i].selected) rolesForDelete.push({
                id: formDelete.roles.options[i].value,
                role: formDelete.roles.options[i].text
            });
        }

// Отправляем запрос на сервер для редактирования пользователя
        fetch("http://localhost:8080/api/admin/users/" + formDelete.id.value, {
            method: 'DELETE', // Метод DELETE используется для частичного обновления ресурса
            headers: {// Заголовки запроса
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({// Тело запроса
                id: formDelete.id.value,
                firstName: formDelete.firstName.value,
                lastName: formDelete.lastName.value,
                age: formDelete.age.value,
                email: formDelete.email.value,
                roles: rolesForDelete // Передаем массив ролей в теле запроса
            })
        }).then(() => {// После успешной отправки запроса выполняем следующие действия
            // Закрываем модальное окно
            const modalDelete = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            // Закрываем модальное окно
            modalDelete.hide();
            // Обновляем список всех пользователей
            getAllUsers();
        });
    });
}

// Функция для загрузки ролей для выбора в форме редактирования
function loadRolesForDelete() {
    // Получаем элемент выпадающего списка для ролей
    let selectDelete = document.getElementById("delete-roles");
    selectDelete.innerHTML = "";
// Отправляем запрос на сервер для получения списка ролей
    fetch("http://localhost:8080/api/admin/roles")
        .then(res => res.json())
        .then(data => {
            // Проходимся по каждому элементу полученных данных
            data.forEach(role => {
                // Создаем новую опцию для выпадающего списка
                let option = document.createElement("option");
                // Задаем значение и текст для опции
                option.value = role.id;
                option.text = role.name;
                // Добавляем опцию в выпадающий список
                selectDelete.appendChild(option);
            });
        })
        .catch(error => console.error(error));// Логирование ошибок
}

// Обработчик события для корректного удаления темного фона после закрытия модального окна
document.addEventListener('DOMContentLoaded', function () {
    $('#deleteModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    });
});
// При загрузке страницы запускаем функцию для загрузки ролей
window.addEventListener("load", loadRolesForDelete);