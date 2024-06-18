$(document).ready(function () {
    $('.table .btn-info').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (user, status) {
            $('#id').val(user.id);
            $('#firstName').val(user.firstName);
            $('#lastName').val(user.lastName);
            $('#age').val(user.age);
            $('#email').val(user.email);
            $('#password').val(user.password);
            $('#roles').val(user.roles.map(role => role.name).join(', '));
            $('#editModal').modal('show');
        });
    });
});
$(document).ready(function () {
    $('.table .btn-danger').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (user, status) {
            $('#deleteModal #id').val(user.id);
            $('#deleteModal #firstName').val(user.firstName);
            $('#deleteModal #lastName').val(user.lastName);
            $('#deleteModal #age').val(user.age);
            $('#deleteModal #email').val(user.email);
            $('#deleteModal #roles').val(user.roles.map(role => role.name));
            $('#deleteModal').modal('show');
        });
    });
});
