var sending = false;

$(function () {
    $(document).on('click', '.form-profile-image', function () {
        $("#image").click();
    });

    $('#image').change(function () {
        if (this.files[0].size > 5000000) {
            toastr.error("Imagem não pode ter mais que 5MB.", "Ops!")
            $('#image').val("");
        }
    });

    $(document).on('click', '#btn-edit-profile', function () {
        editProfile();
    });

    initializeMask();
});

function editProfile() {
    var valid = true;

    if ($("#name").val().trim() == "") {
        toastr.error('Nome é obrigatório.', 'Ops!');
        valid = false;
    }

    if ($("#phone").val().trim() != "") {
        if (!isPhone($("#phone").val().trim())) {
            toastr.error('Telefone inválido.', 'Ops!');
            valid = false;
        }
    }

    if (valid && !sending) {
        sending = true;
        var form = new FormData($('#form-profile')[0]);

        $.ajax({
                url: '/profile',
                type: 'POST',
                data: form,
                ache: false,
                contentType: false,
                processData: false,
            }).done(function (res) {
                toastr.success('Perfil editado com sucessso.', 'Ops!');
                setTimeout(() => {
                    window.open('/profile', '_self');
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