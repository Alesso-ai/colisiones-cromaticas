//Alejandro Ruiz Prieto
//Git Hub: https://github.com/Alesso-ai/colisiones-cromaticas.git



//Query selector coge todo del html sin tener q meter ID o
const canvas = document.querySelector('canvas');

//Hace referencia a la variable que hemos enlazado a canvas
const ctx = canvas.getContext('2d');

//Declarar el acnho y el alto de la pantalla para que reboten las BOLAS.
 const width = canvas.width = window.innerWidth
 const height = canvas.height = window.innerHeight

//Generar un metodo random para que saque colores en rgb de 0 a 255
 const random = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
 }

 //Crear constante para generar el color, lo hacemos 3 veces
 const randomRGB = () =>{
        return `rgb(${random(0, 255)},rgb(${random(0, 255)},rgb(${random(0, 255)})`
 }
