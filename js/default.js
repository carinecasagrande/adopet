$(function () {
    $(document).on("click", ".form-fieldset-eye", function () {
        togglePasswordInput(this);
    });

    initializeElements();
    initializeToastr();
});

function togglePasswordInput(elem) {
    var id = $(elem).attr("data-id");
    if ($(elem).hasClass("fa-eye-slash")) {
        $(elem).removeClass("fa-eye-slash")
        $(elem).addClass("fa-eye")
        $(`#${id}`).attr("type", "text");
    } else {
        $(elem).addClass("fa-eye-slash")
        $(elem).removeClass("fa-eye")
        $(`#${id}`).attr("type", "password");
    }

}

function initializeElements() {
    $("#nav").load("./template/nav.html");
    $("#footer").load("./template/footer.html");
}

function initializeToastr() {
    if (typeof toastr != "undefined") {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-left",
            "preventDuplicates": true,
            "onclick": null,
            "timeOut": "2000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
}

function isEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}