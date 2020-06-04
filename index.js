const COLORES = ['rojo', 'verde', 'amarillo', 'azul', 'gris', 'violeta'];
const LISTA_COLORES = duplicarColores();
let turnos = 0;

document.querySelector('#boton-empezar').onclick = empezarJuego;
document.querySelector('#boton-reiniciar').onclick = reiniciarJuego;

function empezarJuego() {
    actualizarEstado('¡Encuentra los pares!');
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();
    distribuirColores();
    manejarRonda();
}

function manejarRonda() {
    desbloquearInputUsuario();
    actualizarEstado();
}

function bloquearCuadro($cuadro) {
    $cuadro.onclick = function () {};
}

function manejarInputUsuario(e) {
    const $cuadro1 = e.target;
    bloquearCuadro($cuadro1);
    mostrarOcultarCuadro($cuadro1);
}

function mostrarOcultarCuadro($cuadro) {
    $cuadro.classList.toggle('dado-vuelta');
}

function duplicarColores() {
    let lista = [];
    for (let i = 0; i < COLORES.length; i++) {
        lista.push(COLORES[i]);
        lista.push(COLORES[i]);
    }
    return lista;
}

function distribuirColores() {
    let listaAux = LISTA_COLORES;
    listaAux = shuffle(LISTA_COLORES);
    let i = 0;
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.classList.add(`${listaAux[i]}`, 'dado-vuelta');
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

function reiniciarJuego() {
    bloquearInputUsuario();
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    actualizarEstado(
        'El juego consiste en encontrar los pares de colores. Para jugar dale a empezar.'
    );
    reiniciarCuadros();
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

function reiniciarCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        for (let i = 0; i < COLORES.length; i++) {
            $cuadro.classList.remove(`${COLORES[i]}`);
        }
        $cuadro.classList.remove('dado-vuelta');
    });
}
