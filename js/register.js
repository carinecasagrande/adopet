$(function () {
    $(document).on("click", "#btn-register", function () {
        register();
    });
});

function register() {
    var elem = null;
    var valid = true;

    elem = $("#email");
    if (elem.val().trim() == "") {
        toastr.error("Email é obrigatório.", "Ops!");
        valid = false;
    } else {
        if (!isEmail(elem.val().trim())) {
            toastr.error("Email inválido.", "Ops!");
            valid = false;
        }
    }

    elem = $("#name");
    if (elem.val().trim() == "") {
        toastr.error("Nome é obrigatório.", "Ops!");
        valid = false;
    }

    elem = $("#password");
    if (elem.val().trim() == "") {
        toastr.error("Senha é obrigatório.", "Ops!");
        valid = false;
    }

    elem = $("#conf_password");
    if (elem.val().trim() == "") {
        toastr.error("Confirmação da senha é obrigatório.", "Ops!");
        valid = false;
    } else {
        if ($("#password").val().trim() != "") {
            if ($("#password").val().trim() != elem.val().trim()) {
                toastr.error("As senhas não conferem.", "Ops!");
                valid = false;
            }
        }
    }

    if (valid) {
        // Simula que está enviando
        $("#form-register")[0].reset();
        toastr.success("Cadastro realizado.", "Ops!");
        setTimeout(() => {
            window.open("./index.html", "_self");
        }, 1000);
    }
}