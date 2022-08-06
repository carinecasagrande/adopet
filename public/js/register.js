var sending = false;

$(function () {
    $(document).on('click', '#btn-register', function () {
        register();
    });
});

function register() {
    var elem = null;
    var valid = true;

    elem = $('#email');
    if (elem.val().trim() == '') {
        toastr.error('Email é obrigatório.', 'Ops!');
        valid = false;
    } else {
        if (!isEmail(elem.val().trim())) {
            toastr.error('Email inválido.', 'Ops!');
            valid = false;
        }
    }

    elem = $('#name');
    if (elem.val().trim() == '') {
        toastr.error('Nome é obrigatório.', 'Ops!');
        valid = false;
    }

    elem = $('#password');
    if (elem.val().trim() == '') {
        toastr.error('Senha é obrigatório.', 'Ops!');
        valid = false;
    }

    elem = $('#conf_password');
    if (elem.val().trim() == '') {
        toastr.error('Confirmação da senha é obrigatório.', 'Ops!');
        valid = false;
    } else {
        if ($('#password').val().trim() != '') {
            if ($('#password').val().trim() != elem.val().trim()) {
                toastr.error('As senhas não conferem.', 'Ops!');
                valid = false;
            }
        }
    }

    if (valid && !sending) {
        sending = true;
        var form = new FormData($('#form-register')[0])
        var object = {};
        form.forEach(function (value, key) {
            object[key] = value;
        });

        $.ajax({
                url: '/register',
                type: 'POST',
                data: JSON.stringify(object),
                contentType: 'application/json; charset=utf-8',
            }).done(function (res) {
                $('#form-register')[0].reset();
                toastr.success('Cadastro realizado com sucess.', 'Oba!');
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