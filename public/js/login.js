var sending = false;

$(function () {
    $(document).on('click', '#btn-login', function () {
        login();
    });
});

function login() {
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    var valid = true;

    if (email == '') {
        toastr.error('Email é obrigatório.', 'Ops!');
        valid = false;
    } else {
        if (!isEmail(email)) {
            toastr.error('Email inválido.', 'Ops!');
            valid = false;
        }
    }

    if (password == '') {
        toastr.error('Senha é obrigatório.', 'Ops!');
        valid = false;
    }

    if (valid && !sending) {
        sending = true;
        var form = new FormData($('#form-login')[0])
        var object = {};
        form.forEach(function (value, key) {
            object[key] = value;
        });

        $.ajax({
                url: '/login',
                type: 'POST',
                data: JSON.stringify(object),
                contentType: 'application/json; charset=utf-8',
            }).done(function (res) {
                $('#form-login')[0].reset();
                toastr.success('Login efetuado com sucesso! Você será redirecionado.', 'Oba!');
                setTimeout(() => {
                    window.open('/', '_self');
                }, 1000);
            })
            .fail(function (err) {
                toastr.error(err.responseText, 'Ops!');
            })
            .always(function () {
                sending = false;
            });
    }
}