if(navigator.online){
    console.log('conectado bro');
}

window.addEventListener("online", e => {
    console.log("conectado bro");
  });
window.addEventListener("offline", e => {
    console.log("no conectado bro :(");
  });


const input = document.querySelector('#form1');
const btn = document.querySelector('#btn-buscar');
let seccion = document.querySelector('#cards');
let error = document.querySelector('.error');
let cargando = document.querySelector('.cargando');
let agregar = [];
let agregar2 = [];

const getGrahql = personaje => `query { characters(filter: { name: "${personaje}" }) {results {name image status,id} } }`;

btn.addEventListener("click", e => {

    let buscar = input.value;
    
    if(buscar == '' || buscar == null) {
      error.style.display = "block";
      error.innerHTML = 'Coloca un personaje';
      setTimeout(() => {
        error.style.display = "none";
      },2000)
      return
    }
    let opciones = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query: getGrahql(buscar)})
    }
    cargando.innerHTML = '...cagando';
    if(buscar) {
      setTimeout(() => {
        cargando.innerHTML = '';
      },500);
      fetch('https://rickandmortyapi.com/graphql',opciones)
      .then(response => response.json())
      .then(datos => {
        obtenerPersonajes(datos)
      }).catch(err => console.log(err))
      .finally(() => {
        input.value = ''
      })
    }
});

const obtenerPersonajes = datos =>{
  seccion.innerHTML = '';
  for(let dato of datos.data.characters.results) {
    if(dato.status == 'Dead'){dato.status = 'Muerto';}

    if(dato.status == 'Alive'){dato.status = 'Vivo';}

    if(dato.status == 'unknown'){dato.status = 'Desconocido';}

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

    figcaption.append(encabezado,estatus,btn_agregar);
    figure.append(imagen,figcaption);
    seccion.append(figure);
  }
  
let botonAgregar = document.querySelectorAll('.btnAgregar');
for(let boton of botonAgregar){
  boton.addEventListener('click', e =>{
    let id = e.target.dataset.id;
    agregar.push(id);
    localStorage.setItem('id', JSON.stringify(agregar));
  });
}

}
