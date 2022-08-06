$(function () {
    $(document).on('click', '.form-fieldset-eye', function () {
        togglePasswordInput(this);
    });

    initializeToastr();
});

function isPhone(phone) {
    phone = phone.replace(/[^0-9]/g, '');

    if (phone.length < 10 || phone.length > 11) {
        return false;
    }

    return true;
}

function togglePasswordInput(elem) {
    var id = $(elem).attr('data-id');
    if ($(elem).hasClass('fa-eye-slash')) {
        $(elem).removeClass('fa-eye-slash')
        $(elem).addClass('fa-eye')
        $(`#${id}`).attr('type', 'text');
    } else {
        $(elem).addClass('fa-eye-slash')
        $(elem).removeClass('fa-eye')
        $(`#${id}`).attr('type', 'password');
    }
}

function initializeToastr() {
    if (typeof toastr != 'undefined') {
        toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-bottom-left',
            'preventDuplicates': true,
            'onclick': null,
            'timeOut': '2000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }
    }
}

function isEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}