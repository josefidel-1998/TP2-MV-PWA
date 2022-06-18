
    let obtenerId = JSON.parse(localStorage.getItem('id'));
    let arrayId = [];
    let coma = ',';
    var c;
    for(let id of obtenerId){
        c = id + coma;
        arrayId.push(id);
        let favoritos = document.querySelector('#favoritos');

    fetch(`https://rickandmortyapi.com/api/character/${c}`)
        .then(response => response.json())
        .then(data =>{
            for(let dato of data){
                let figure = document.createElement('figure');
                let img = document.createElement('img');
                let figcaption = document.createElement('figcaption');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                let borrar = document.createElement('button');
                figure.append(img,figcaption);
                figcaption.append(h2,h3,borrar);
                img.src = dato.image;
                h2.innerHTML = dato.name;
                h3.innerHTML = dato.status;
                borrar.innerHTML = 'Borrar';
                borrar.dataset.id = dato.id;
                borrar.classList = 'btnQuitar';
                favoritos.append(figure);
            }
            let btnQuitar = document.querySelectorAll('.btnQuitar');

            for(let borrar of btnQuitar){
                borrar.addEventListener('click', e =>{
                    let objetivo = e.target.dataset.id;
                    localStorage.removeItem('id',objetivo);
                });
            }
        }).catch(err => console.log(err));
        
    }
    console.table(arrayId)