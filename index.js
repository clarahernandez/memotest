const COLORES_DISPONIBLES = ['rojo', 'verde', 'amarillo', 'azul', 'negro', 'violeta'];
let paresColores = [];
duplicarColores();
let turnos = 0;

document.querySelector('#boton-empezar').onclick = empezarJuego;

function empezarJuego() {
    actualizarEstado('¡Encuentra los pares!');
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    distribuirColores();
    desbloquearInputUsuario();
    manejarInputUsuario();
}

function duplicarColores() {
    for (let i = 0; i < COLORES_DISPONIBLES.length; i++) {
        paresColores.push(COLORES_DISPONIBLES[i]);
        paresColores.push(COLORES_DISPONIBLES[i]);
    }
}

function distribuirColores() {
    paresColores = shuffle(paresColores);
    let i = 0;
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.classList.add(`${paresColores[i]} oculto`);
        i++;
    });
}

function ocultarBotonEmpezar() {
    document.querySelector('#boton-empezar').className = 'btn btn-outline-success oculto';
}

function mostrarBotonReiniciar() {
    document.querySelector('#boton-reiniciar').className = 'btn btn-outline-danger';
}

function mostrarBotonEmpezar() {
    document.querySelector('#boton-empezar').className = 'btn btn-outline-success';
}

function ocultarBotonReiniciar() {
    document.querySelector('#boton-reiniciar').className = 'btn btn-outline-danger oculto';
}

function reiniciar() {
    bloquearInputUsuario();
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    actualizarEstado(
        'El juego consiste en encontrar los pares de colores.</br>Para empezar dale a jugar.'
    );
    turnos = 0;
}

function actualizarEstado(texto) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = texto;
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = function () {}; //Le digo que cuando haga click no pase nada.
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

//Fisher-Yates Shuffle algorithm.
function shuffle(array) {
    let contador = array.length;

    while (contador > 0) {
        let index = Math.floor(Math.random() * contador);
        contador--;

        // Intercambiamos el ultimo elemento.
        let temp = array[contador];
        array[contador] = array[index];
        array[index] = temp;
    }

    return array;
}
