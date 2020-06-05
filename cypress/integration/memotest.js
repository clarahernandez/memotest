/// <reference types="Cypress"/>

const URL = '127.0.0.1:8080';

const NUMERO_CUADROS = 12;

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });
    it('se asegura que haya un tablero con 12 cuadro', () => {
        cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
    });

    it('se asegura que los cuadros sean aleatorios', () => {
        cy.get('#boton-empezar').click;
        cy.get('.cuadro').then((cuadros) => {
            let clasesOriginales = [];
            cuadros.each(function (i, cuadro) {
                clasesOriginales.push(cuadro.className);
            });

            cy.visit(URL);
            cy.get('#boton-empezar').click;

            let clasesNuevas = [];
            cy.get('.cuadro').then((nuevosCuadros) => {
                nuevosCuadros.each(function (i, cuadro) {
                    clasesNuevas.push(cuadro.className);
                });

                cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
            });
        });
    });
});
