$(function () {
    loadPetsList();
});

function loadPetsList() {
    $.ajax({
            url: '/api/pets',
            type: 'GET',
        }).done(function (res) {
            if (res.length <= 0) {
                $('.card-group').html(`<p class='message'>Ainda não temos nenhum pet diponível 😞</p>`);
            } else {
                for (var i in res) {
                    const pet = res[i];
                    let html = ``;
                    html += `<section class='card'>`;
                    html += `   <img src='${pet.image}' alt='${pet.name}' class='card-image'>`;
                    html += `   <div class='card-info'>`;
                    html += `       <div class='card-info-name'>${pet.name}</div>`;
                    html += `       <div class='card-info-years'>${pet.years}</div>`;
                    html += `       <div class='card-info-size'>${pet.size}</div>`;
                    html += `       <div class='card-info-desc'>${pet.description}</div>`;
                    html += `       <div class='card-info-city'>${pet.city}</div>`;
                    html += `       <a class='card-info-contact' href='/contact?pet=${pet.name}'>`;
                    html += `           <img src='./image/chat.svg' alt='Chat'>`;
                    html += `           Falar com responsável`;
                    html += `       </a>`;
                    html += `   </div>`;
                    html += `</section>`;
                    $('.card-group').append(html);
                }
            }
        })
        .fail(function (err) {
            toastr.error(err.responseText, 'Ops!');
            $('.card-group').html(`<p class='message'>Ocorreu um erro ao buscar os pets 😮<br/>Atualize a página e tente novamente.</p>`);
        });
}