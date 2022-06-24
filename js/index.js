const input = document.querySelector('#form1');
const btn = document.querySelector('#btn-buscar');
let seccion = document.querySelector('#cards');
let error = document.querySelector('.error');
let cargando = document.querySelector('.cargando');
let agregar = [];
let h2 = document.querySelector('.buscar h2');
let aviso = document.querySelector('#aviso');
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
    cargando.innerHTML = '...cargando';
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
            aviso.style.display = 'block';
            aviso.innerHTML = 'Agregado a favoritos'; 
            setTimeout(() =>{
                aviso.style.display = 'none';
            },800)
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
            nombre: 'Alien Rick',
            img: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
            estatus: 'Vivo',
            descripcion: 'Fue uno de los muchos Ricks que asistieron al juicio de Rick (C-137) ante el Consejo de Ricks en "Close Rick-counters of the Rick Kind".'
        },
        {
            nombre: 'Evil Morty',
            img: 'https://rickandmortyapi.com/api/character/avatar/118.jpeg',
            estatus: 'Vivo',
            descripcion: 'Es el principal antagonista de la serie, que actualmente se desempeña como el primer Morty en ser elegido democráticamente Presidente de la ciudadela.'
        },
        {
            nombre: 'Morty Smith',
            img: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            estatus: 'Vivo',
            descripcion: 'Es uno de los protagonistas principales de la serie animada Rick and Morty. Tiene constantes aventuras con su abuelo Rick Sánchez para ayudarlo siendo la mayoría de las ocasiones en contra de su voluntad.'
        },
        {
            nombre: 'Beth Summer',
            img: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
            estatus: 'Vivo',
            descripcion: 'Es la hija de Rick pero técnicamente es la hija de un Rick muerto en un accidente, a lo que el Rick y Morty originarios de la Dimensión C-137 ocuparon sus lugares.'
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

