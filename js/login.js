const firebaseConfig = {
    apiKey: "AIzaSyAYjY6BrLPutlaw3GP0JW2Y6FqWrniarOg",
    authDomain: "adopet-carinecasagrande.firebaseapp.com",
    projectId: "adopet-carinecasagrande",
    storageBucket: "adopet-carinecasagrande.appspot.com",
    messagingSenderId: "459110770331",
    appId: "1:459110770331:web:8de035d6cbb92cf7e7483e"
};

$(function () {
    firebase.initializeApp(firebaseConfig);

    $(document).on("click", "#btn-login", function () {
        login();
    });
});

function login() {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    var valid = true;

    if (email == "") {
        toastr.error("Email é obrigatório.", "Ops!");
        valid = false;
    } else {
        if (!isEmail(email)) {
            toastr.error("Email inválido.", "Ops!");
            valid = false;
        }
    }

    if (password == "") {
        toastr.error("Senha é obrigatório.", "Ops!");
        valid = false;
    }

    if (valid) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.open("./pets.html", "_self");
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/user-not-found":
                        toastr.error("Usuário não existe. Crie uma conta para continuar.", "Ops!");
                        break;
                    case "auth/wrong-password":
                        toastr.error("Senha incorreta.", "Ops!");
                        break;
                    default:
                        toastr.error("Ocorreu um erro ao logar. Tente novamente mais tarde.", "Ops!");
                        break;
                }
            });
    }
}