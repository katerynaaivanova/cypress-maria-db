module.exports = function() {
    Cypress.Commands.add('sqlQuery', (queryString, values) => {
        if (!queryString) {
            throw new Error('Query must be set');
        }
        return cy.task("sqlQuery:execute", {sql: queryString, values});
    });
}