/// <reference types="Cypress"/>

const URL = '127.0.0.1:8080';

const NUMERO_CUADROS = 12;

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('juega al memotest', () => {
        const NUMERO_CUADROS = 12;

        it('se asegura que haya un tablero con cuadros', () => {
            cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
        });

        it('se asegura que los cuadros sean aleatorios', () => {
            cy.get('#boton-empezar').click();
            cy.get('.cuadro').then((cuadros) => {
                let clasesOriginales = [];
                cuadros.each(function (i, cuadro) {
                    clasesOriginales.push(cuadro.className);
                });
                cy.visit(URL);
                cy.get('#boton-empezar').click();
                let clasesNuevas = [];
                cy.get('.cuadro').then((nuevosCuadros) => {
                    nuevosCuadros.each(function (i, cuadro) {
                        clasesNuevas.push(cuadro.className);
                    });
                    cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
                });
            });
        });

        describe('resuelve el juego', () => {
            let mapaDePares, listaDePares;
            it('elige una combinación errónea', () => {
                cy.get('.cuadro').then((cuadros) => {
                    mapaDePares = obtenerParesDeCuadros(cuadros);
                    listaDePares = Object.values(mapaDePares);

                    console.log(listaDePares);
                    cy.get(listaDePares[0][0]).click();
                    cy.get(listaDePares[1][0]).click();
                });
            });

            it('resuelve el juego', () => {
                listaDePares.forEach((par) => {
                    cy.get(par[0]).click();
                    cy.get(par[1]).click();
                });

                const numeroTurnos = NUMERO_CUADROS / 2 + 1; //porque se testeó 1 incorrecto.
            });
        });
    });
});

function obtenerParesDeCuadros(cuadros) {
    const pares = {};

    cuadros.each((i, cuadro) => {
        const claseColor = cuadro.className;

        if (pares[claseColor]) {
            pares[claseColor].push(cuadro);
        } else {
            pares[claseColor] = [cuadro];
        }
    });

    console.log(pares);
    return pares;
}
