var sending = false;

$(function () {
    $(document).on('click', '#btn-contact', function () {
        contact();
    });

    initializeMask();
});

function initializeMask() {
    var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskBehavior.apply({}, arguments), options);
            }
        };

    $('#phone').mask(maskBehavior, options);
}

function contact() {
    var elem = null;
    var valid = true;

    elem = $('#name');
    if (elem.val().trim() == '') {
        toastr.error('Nome é obrigatório.', 'Ops!');
        valid = false;
    }

    elem = $('#phone');
    if (elem.val().trim() == '') {
        toastr.error('Telefone é obrigatório.', 'Ops!');
        valid = false;
    } else if (!isPhone(elem.val().trim())) {
        toastr.error('Telefone inválido.', 'Ops!');
        valid = false;
    }

    elem = $('#pet');
    if (elem.val().trim() == '') {
        toastr.error('Nome do animal é obrigatório.', 'Ops!');
        valid = false;
    }

    elem = $('#message');
    if (elem.val().trim() == '') {
        toastr.error('Mensagem é obrigatório.', 'Ops!');
        valid = false;
    }

    if (valid && !sending) {
        sending = true;
        var form = new FormData($('#form-contact')[0])
        var object = {};
        form.forEach(function (value, key) {
            object[key] = value;
        });

        $.ajax({
                url: '/contact',
                type: 'POST',
                data: JSON.stringify(object),
                contentType: 'application/json; charset=utf-8',
            }).done(function (res) {
                $('#form-contact')[0].reset();
                toastr.success('Mensagem enviada com sucessso.', 'Ops!');
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