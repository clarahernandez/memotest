const COLORES = ['rojo', 'verde', 'amarillo', 'azul', 'gris', 'violeta'];
const LISTA_COLORES = duplicarColores();
let ronda = 0;
let cuadrosEnUso = [];
let parejasDisponibles = COLORES.length;

document.querySelector('#boton-empezar').onclick = empezarJuego;
document.querySelector('#boton-reiniciar').onclick = reiniciarJuego;

function empezarJuego() {
    actualizarEstado('¡Encuentra los pares!');
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();
    distribuirColores();
    manejarRonda();
    desbloquearCuadros();
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
                    desbloquearCuadro($cuadro);
                    console.log($cuadro);
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
    bloquearCuadros();
    actualizarEstado(`¡Ganaste!`);
}

function manejarInputUsuario(e) {
    let $cuadroAux = e.target;
    console.log($cuadroAux);
    bloquearCuadro($cuadroAux);
    mostrarOcultarCuadro($cuadroAux);
    cuadrosEnUso.push($cuadroAux);
    manejarRonda();
}

function actualizarRonda(texto) {
    document.querySelector('#ronda').textContent = `Ronda: ${texto}`;
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
        $cuadro.classList.add('dado-vuelta', `${listaAux[i]}`);
        i++;
    });
}

function reiniciarJuego() {
    bloquearCuadros();
    actualizarRonda('0');
    reiniciarCuadros();
    empezarJuego();
    ronda = 0;
    parejasDisponibles = COLORES.length;
    cuadrosEnUso = [];
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

function reiniciarCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        reiniciarCuadro($cuadro);
    });
}

function reiniciarCuadro($cuadro) {
    $cuadro.className = 'col-sm-4 cuadro';
}

function marcarEncontrados() {
    cuadrosEnUso.forEach(function ($cuadro) {
        reiniciarCuadro($cuadro);
        $cuadro.classList.add('exito');
    });
}

function bloquearCuadro($cuadro) {
    $cuadro.onclick = function () {};
}
function desbloquearCuadro($cuadro) {
    $cuadro.onclick = manejarInputUsuario;
}

function ocultarBotonEmpezar() {
    document.querySelector(`#boton-empezar`).classList.add('oculto');
}
function mostrarBotonReiniciar() {
    document.querySelector(`#boton-reiniciar`).classList.remove('oculto');
}

function actualizarEstado(texto) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = texto;
}

function bloquearCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        bloquearCuadro($cuadro);
    });
}

function desbloquearCuadros() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        desbloquearCuadro($cuadro);
    });
}
