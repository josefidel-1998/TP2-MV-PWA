const input = document.querySelector('#form1');
const btn = document.querySelector('#btn-buscar');
let seccion = document.querySelector('#cards');
let error = document.querySelector('.error');
let cargando = document.querySelector('.cargando');
let agregar = [];
let h2 = document.querySelector('.buscar h2');

const getGrahql = personaje => `query { 
    characters(filter: { name: "${personaje}" }) {results {name image status id} }}`;

btn.addEventListener("click", e => {

    let buscar = input.value;

    if (buscar == '' || buscar == null) {
        error.style.display = "block";
        error.innerHTML = 'Coloca un personaje';
        setTimeout(() => {
            error.style.display = "none";
        }, 2000)
        return
    }
    let opciones = {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: getGrahql(buscar)})
    }
    cargando.innerHTML = '...cagando';
    if (buscar) {
        setTimeout(() => {
            cargando.innerHTML = '';
        }, 500);
        fetch('https://rickandmortyapi.com/graphql', opciones)
            .then(response => response.json())
            .then(datos => {
                obtenerPersonajes(datos)
            }).catch(err => console.log(err))
            .finally(() => {
                input.value = ''
            });
    }
});

const obtenerPersonajes = datos => {
    seccion.innerHTML = '';
    for (let dato of datos.data.characters.results) {
        console.table(dato.image)
        if (dato.status == 'Dead') {dato.status = 'Muerto';}

        if (dato.status == 'Alive') {dato.status = 'Vivo';}

        if (dato.status == 'unknown') {dato.status = 'Desconocido';}

        let figure = document.createElement('figure');
        let imagen = document.createElement('img');
        let figcaption = document.createElement('figcaption');
        let encabezado = document.createElement('h3');
        let estatus = document.createElement('h4');
        let btn_agregar = document.createElement('button');
        btn_agregar.innerHTML = 'Añadir a favoritos';
        estatus.innerHTML = dato.status;
        encabezado.innerHTML = dato.name;
        imagen.src = dato.image;

        btn_agregar.className = 'btnAgregar';
        btn_agregar.dataset.id = dato.id;

        figcaption.append(encabezado, estatus, btn_agregar);
        figure.append(imagen, figcaption);
        seccion.append(figure);
    }

    let botonAgregar = document.querySelectorAll('.btnAgregar');
    for (let boton of botonAgregar) {
        boton.addEventListener('click', e => {
            let id = e.target.dataset.id;

            if (agregar.indexOf(id) === -1) {
                agregar.push(id);
                localStorage.setItem('id', JSON.stringify(agregar));
            }
        });
    }
}

let body = document.querySelector('body');

if (navigator.onLine) {
    console.log('Online');
    modo.innerHTML = 'Online';
} else {
    console.log('Offline');
    modo.innerHTML = 'Offline';
    body.style.background = '#548C45';
    input.style.display = 'none';
    btn.style.display = 'none';
    h2.innerHTML = '';
    let personajes = [
        {
            nombre: 'Rick Sanchez',
            img: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            estatus: 'Vivo',
            descripcion: 'Es un científico loco sociopático que parece conocer todo en el universo y por lo tanto encuentra la vida una experiencia traumática y sin sentido. '
        },
        {
            nombre: 'Adjudicator Rick',
            img: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
            estatus: 'Muerto',
            descripcion: 'El adjudicador Rick junto con otros Ricks en la multitud estaban juzgando a los candidatos para el próximo presidente de The Citadel. Se demostró que no tomó muy en serio al presidente Morty y tampoco a los otros candidatos.'
        },
        {
            nombre: 'Morty Smith',
            img: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            estatus: 'Vivo',
            descripcion: 'Conocido por su inquietud, torpeza y su cuestionable y dudosa personalidad, el personaje ha sido bien recibido por los seguidores de la serie. '
        },
        {
            nombre: 'Alien Morty',
            img: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
            estatus: 'Desconocido',
            descripcion: 'Alien Morty es un adolescente alienígena. Tiene la piel viscosa de color verde lima. Tiene dos antenas rizadas en la cabeza y cabello castaño corto.'
        },
        {
            nombre: 'Summer Smith',
            img: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
            estatus: 'Vivo',
            descripcion: 'Summer es una adolescente convencional y a menudo superficial, inicialmente de 17 años, que está obsesionada con mejorar su estatus social entre sus compañeros.'
        },
        {
            nombre: 'Evil Summer Clone',
            img: 'https://rickandmortyapi.com/api/character/avatar/120.jpeg',
            estatus: 'Muerto',
            descripcion: 'Era una versión alternativa del Summer original, que apareció en el episodio Meeseeks and Destroy.'
        }
    ];
for(let personaje of personajes) {
    let cardOffline = document.createElement('div');
    cardOffline.className = 'cardOffline';

    let figure = document.createElement('figure');

    let figcaption = document.createElement('figcaption');
    let h3 = document.createElement('h3');
    h3.innerHTML = personaje.nombre;

    let img = document.createElement('img');
    img.src = personaje.img;

    let h4 = document.createElement('h4');
    h4.innerHTML = personaje.estatus;

    let p = document.createElement('p');
    p.innerHTML = personaje.descripcion;

    let divBack = document.createElement('div');
    let divFront = document.createElement('div');

    divFront.className ='cartas card-offline';
    divBack.className = 'cartas figure-back';
    divBack.appendChild(p);
    divFront.append(figure);

    cardOffline.append(divFront,divBack);
    figcaption.append(h3,h4);
    figure.append(img,figcaption);
    seccion.append(cardOffline);
}
}
