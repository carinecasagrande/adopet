$(function () {
    $(document).on("click", "#btn-contact", function () {
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

    $("#phone").mask(maskBehavior, options);
}

function contact() {
    var elem = null;
    var valid = true;

    elem = $("#name");
    if (elem.val().trim() == "") {
        toastr.error("Nome é obrigatório.", "Ops!");
        valid = false;
    }

    elem = $("#phone");
    if (elem.val().trim() == "") {
        toastr.error("Telefone é obrigatório.", "Ops!");
        valid = false;
    } else if (!isPhone(elem.val().trim())) {
        toastr.error("Telefone inválido.", "Ops!");
        valid = false;
    }

    elem = $("#pet");
    if (elem.val().trim() == "") {
        toastr.error("Nome do animal é obrigatório.", "Ops!");
        valid = false;
    }

    elem = $("#message");
    if (elem.val().trim() == "") {
        toastr.error("Mensagem é obrigatório.", "Ops!");
        valid = false;
    }

    if (valid) {
        // Simula que está enviando
        $("#form-contact")[0].reset();
        toastr.success("Mensagem enviada.", "Ops!");
    }
}