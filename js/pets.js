$(function () {
    loadPetsList();
});

function loadPetsList() {
    var petList = JSON.parse(getPetsList());
    for (var i in petList.pets) {
        const pet = petList.pets[i];
        let html = ``;
        html += `<section class="card">`;
        html += `   <img src="${pet.image}" alt="${pet.name}" class="card-image">`;
        html += `   <div class="card-info">`;
        html += `       <div class="card-info-name">${pet.name}</div>`;
        html += `       <div class="card-info-years">${pet.years}</div>`;
        html += `       <div class="card-info-size">${pet.size}</div>`;
        html += `       <div class="card-info-desc">${pet.description}</div>`;
        html += `       <div class="card-info-city">${pet.city}</div>`;
        html += `       <div class="card-info-contact">`;
        html += `           <img src="./image/chat.svg" alt="Chat">`;
        html += `           Falar com responsável`;
        html += `       </div>`;
        html += `   </div>`;
        html += `</section>`;
        $(".card-group").append(html);
    }
}

function getPetsList() {
    return '{"pets":[{"id":1,"name":"Dunga","years":"2 anos","size":"Porte pequeno","description":"Calmo e educado","city":"Rio de Janeiro (RJ)","image":"./image/dunga.png"},{"id":2,"name":"Felícia","years":"3 meses","size":"Porte pequeno","description":"Ativa e carinhosa","city":"Nova Iguaçu (RJ)","image":"./image/felicia.png"},{"id":3,"name":"Sirius","years":"6 meses","size":"Porte grande","description":"Ativo e educado","city":"Duque de Caxias (RJ)","image":"./image/sirius.png"},{"id":4,"name":"Fiona","years":"3 anos","size":"Porte pequeno","description":"Calma e carinhosa","city":"São Gonçalo (RJ)","image":"./image/fiona.png"},{"id":5,"name":"Sid","years":"8 meses","size":"Porte médio/grande","description":"Brincalhão e amável","city":"Rio de Janeiro (RJ)","image":"./image/sid.png"},{"id":6,"name":"Yoda","years":"1 ano","size":"Porte médio","description":"Ativo e carinhoso","city":"Nova Iguaçu (RJ)","image":"./image/yoda.png"},{"id":7,"name":"Lua","years":"6 meses","size":"Porte médio","description":"Ativa e carinhosa","city":"Duque de Caxias (RJ)","image":"./image/lua.png"},{"id":8,"name":"Amora","years":"45 dias","size":"Porte grande","description":"Calma e carinhosa","city":"São Gonçalo (RJ)","image":"./image/amora.png"},{"id":9,"name":"Zelda","years":"5 meses","size":"Porte médio","description":"Ativa e amável","city":"Rio de Janeiro (RJ)","image":"./image/zelda.png"}]}';
}