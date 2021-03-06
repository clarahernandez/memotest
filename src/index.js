const COLORES = ['rojo', 'verde', 'amarillo', 'azul', 'gris', 'violeta'];
const LISTA_COLORES = duplicarColores();
let ronda = 1;
let cuadrosEnUso = [];
let parejasDisponibles = COLORES.length;

document.querySelector('#boton-empezar').onclick = empezarJuego;
document.querySelector('#boton-reiniciar').onclick = reiniciarJuego;

function empezarJuego() {
    actualizarEstado('¡Encuentra los pares!');
    actualizarRonda(ronda);
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();
    ponerFondoCuadros();
    setTimeout(function () {
        distribuirColores();
        desbloquearTablero();
    }, 200);
}

function reiniciarJuego() {
    reiniciarCuadros();
    ronda = 1;
    parejasDisponibles = COLORES.length;
    cuadrosEnUso = [];
    actualizarRonda(ronda);
    empezarJuego();
}

function manejarRonda() {
    if (cuadrosEnUso.length === 2) {
        ronda++;
        actualizarRonda(ronda);

        if (cuadrosEnUso[0].className === cuadrosEnUso[1].className) {
            marcarEncontrados(cuadrosEnUso);
            parejasDisponibles--;
            cuadrosEnUso = [];
        } else {
            cuadrosEnUso.forEach(function ($cuadro) {
                setTimeout(function () {
                    mostrarOcultarCuadro($cuadro);
                }, 300);
            });

            cuadrosEnUso = [];
        }
    }

    if (!parejasDisponibles) {
        ganar();
    }
}

function ganar() {
    bloquearTablero();
    actualizarEstado(`¡Ganaste!`);
}

function manejarInputUsuario(e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('cuadro')) {
        if ($elemento === cuadrosEnUso[0] || $elemento.classList.contains('exito')) {
            return;
        } else {
            mostrarOcultarCuadro($elemento);
            cuadrosEnUso.push($elemento);
            manejarRonda();
        }
    }
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
        $cuadro.classList.add(`${listaAux[i]}`);
        i++;
    });
}

function ponerFondoCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.classList.add('dado-vuelta');
    });
}

function reiniciarCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        reiniciarCuadro($cuadro);
    });
}

function reiniciarCuadro($cuadro) {
    $cuadro.className = 'col-sm-4 cuadro';
}

function actualizarRonda(texto) {
    document.querySelector('#ronda').textContent = `Ronda: ${texto}`;
}

function mostrarOcultarCuadro($cuadro) {
    $cuadro.classList.toggle('dado-vuelta');
}

function marcarEncontrados() {
    cuadrosEnUso.forEach(function ($cuadro) {
        reiniciarCuadro($cuadro);
        $cuadro.classList.add('exito');
    });
}

function mostrarBotonReiniciar() {
    document.querySelector(`#boton-reiniciar`).classList.remove('oculto');
}
function ocultarBotonEmpezar() {
    document.querySelector(`#boton-empezar`).classList.add('oculto');
}

function actualizarEstado(texto) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = texto;
}

function bloquearTablero() {
    document.querySelector('#tablero').onclick = function () {};
}

function desbloquearTablero() {
    document.querySelector('#tablero').onclick = manejarInputUsuario;
}

//Algoritmo de Fisher-Yates Shuffle para mezclar una lista
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
