if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js").then( message =>{
        console.log('El service worker esta andando');
    });
} else {
    console.log('Service worker no es soportado, pero saca la cerveza del freezer!');
}