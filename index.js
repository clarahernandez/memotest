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
    desbloquearInputUsuario();
}

function manejarRonda() {
    console.log(cuadrosEnUso);
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
                }, 500);
            });

            cuadrosEnUso = [];
        }
    }
    if (!parejasDisponibles) {
        ganar();
    }
}

function ganar() {
    bloquearInputUsuario();
    actualizarEstado(`¡Ganaste! Para volver a jugar haz click en reiniciar.`);
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
        $cuadro.classList.add(`${listaAux[i]}`, 'dado-vuelta');
        i++;
    });
}

function reiniciarJuego() {
    bloquearInputUsuario();
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    actualizarEstado(
        'El juego consiste en encontrar los pares de colores. Para jugar haz click en empezar.'
    );
    actualizarRonda('-');
    reiniciarCuadros();
    ronda = 0;
    parejasDisponibles = COLORES.length;
}

//Algoritmo de Fisher-Yates Shuffle
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
