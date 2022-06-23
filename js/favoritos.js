if (navigator.onLine) {
    // console.log('Online');
    modo.innerHTML = 'Online';
} else {
    // console.log('Offline');
    modo.innerHTML = 'Offline';
    body.style.background = '#548C45';
}

let obtenerId = JSON.parse(localStorage.getItem('id'));
let spanOnline = document.querySelector('#span-online');
let arrayId = [];

let coma = ',';
var c;
if (obtenerId !== null) {
    for (let id of obtenerId) {
        c = id + coma;
        arrayId.push(id);
        let favoritos = document.querySelector('#favoritos');

        fetch(`https://rickandmortyapi.com/api/character/${c}`)
            .then(response => response.json())
            .then(data => {
                for (let dato of data) {
                    if (dato.status == 'Dead') {dato.status = 'Muerto';}

                    if (dato.status == 'Alive') {dato.status = 'Vivo';}
            
                    if (dato.status == 'unknown') {dato.status = 'Desconocido';}

                    let figure = document.createElement('figure');
                    let img = document.createElement('img');
                    let figcaption = document.createElement('figcaption');
                    let h2 = document.createElement('h2');
                    let h3 = document.createElement('h3');
                    let borrar = document.createElement('button');
                    figure.append(img, figcaption);
                    figcaption.append(h2, h3, borrar);
                    img.src = dato.image;
                    h2.innerHTML = dato.name;
                    h3.innerHTML = dato.status;
                    borrar.innerHTML = 'Borrar';
                    borrar.dataset.id = dato.id;
                    borrar.classList = 'btnQuitar';
                    favoritos.append(figure);

                    borrar.addEventListener('click', e => {

                        let objetivo = e.target.dataset.id;

                        let data = JSON.parse(localStorage.getItem('id'));

                        let filtro = data = data.filter(id => id !== objetivo);

                        localStorage.setItem('id', JSON.stringify(filtro));
                        figure.style.display = 'none';
                    });
                }
            }).catch(err => console.log(err));
    }
}


if (arrayId.length === 0) {
    spanOnline.innerHTML = 'No hay nada en favoritos';
} else {
    spanOnline.innerHTML = '';
}