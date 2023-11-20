//Alejandro Ruiz Prieto
//Git Hub: https://github.com/Alesso-ai/colisiones-cromaticas.git

// Query selector coge todo del html sin tener que meter ID o
const canvas = document.querySelector('canvas');

// Hace referencia a la variable que hemos enlazado a canvas
const ctx = canvas.getContext('2d');

// Declarar el ancho y el alto de la pantalla para que reboten las BOLAS.
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Generar un método random para que saque colores en rgb de 0 a 255
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Crear constante para generar el color, lo hacemos 3 veces
const randomRGB = () => {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
};

// Creamos un constructor para que recorra el eje X y el eje Y
// Constructor por parámetros
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x; // Corregido 'y' a 'x'
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    // Dibujar, llamando a ctx que es el objeto 2d, begin path dibuja una nueva ruta
    draw() {
        // Pixel donde nace la bola
        ctx.beginPath();
        // Color propio con el método que hicimos
        ctx.fillStyle = this.color;
        // Damos posición con x e y, damos tamaño con el PI, el 0 es el color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill(); // Agregado para llenar el círculo
    }

    // Método para actualizar en cada instante donde esté la BOLA
    // Tiene 4 condiciones, 4 IFs
    update() {
        // Llamamos al eje x y al tamaño de la pelota, Math.abs es valor absoluto
        // Verifica la posición X de la bola más su tamaño cuando supera el ancho del lienzo
        if (this.x + this.size >= width) {
            // Colisión horizontal hacia el panel derecho
            this.velX = -Math.abs(this.velX); // Corregido 'thix.velX' a 'this.velX'
        }

        // Verifica si la posición X de la pelota menos su tamaño es menor o igual a 0
        if (this.x - this.size <= 0) {
            // Colisión con el borde izquierdo dirección horizontal
            this.velX = Math.abs(this.velX); // Corregido 'thix.velX' a 'this.velX'
        }

        // Verificación de la posición y de la bola más su tamaño cuando supera el ancho del lienzo
        if (this.y + this.size >= height) {
            // Colisión vertical borde inferior
            this.velY = -Math.abs(this.velY); // Corregido 'thix.velX' a 'this.velX'
        }

        // Verifica si la posición y de la pelota menos su tamaño es menor o igual a 0
        if (this.y - this.size <= 0) {
            // Colisión con el borde superior
            this.velY = Math.abs(this.velY); // Corregido 'thix.vely' a 'this.velY'
        }

        // Actualiza las coordenadas de la pelota según las velocidades actuales
        this.x += this.velX;
        this.y += this.velY;
    }

    // Delimitar la colisión entre esa bola y las restantes
    collisionDetect() {
        for (const ball of balls) {
            // Este if hace que la bola sea distinta por la bola que tiene que iterar
            // Verificamos si la pelota actual no es la misma que la pelota de la iteración
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;

                // Multiplicación de los diferenciales de x e y
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Distancia entre las pelotas sea menor que la suma de su tamaño
                if (distance < this.size + ball.size) {
                    // Llamamos a la propiedad de color
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// Hacer un array donde tengamos las pelotas
const balls = [];

// Crear las 25 bolas, esto se repite 25 veces
while (balls.length < 25) {
    const size = random(10, 20);
    // Llamamos a la clase ball
    const ball = new Ball(
        // Generar la posición en X de forma aleatoria para esta bola en el lienzo
        random(0 + size, width - size),
        random(0 + size, height - size),
        // La velocidad y la dirección de X aleatorio entre 7 y -7
        random(-5, 5),
        random(-5, 5),
        randomRGB(),
        size
    );
    // Añadimos una bola
    balls.push(ball);
}

// Hacer un nuevo método para hacer todo lo que tenemos y no pare
const loop = () => {
    // Metemos el color negro con transparencia por eso la rgba a cañón con RGB
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    // Añadimos el color
    ctx.fillRect(0, 0, width, height);

    // For para dibujar las pelotas
    for (const ball of balls) {
        ball.draw(); // Dibujamos la bola
        ball.update(); // Actualiza la bola
        ball.collisionDetect(); // Verificar las colisiones de la bola
    }

    // Llamamos a loop
    requestAnimationFrame(loop); // Solicita al navegador a la función loop
};

loop(); // Inicia el bucle principal
