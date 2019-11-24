# Introduction
Allows interaction with a MariaDB from Cypress commands

# Install

```
npm install --save-dev cypress-maria-db
```

# Configure
## Plugin file
The plug-in can be initialised in your `cypress/plugins/index.js` file as below.

```
const dbTask = require('cypress-mariad-db');

module.exports = (on, config) => {
  tasks = dbTask(config.env.db);
  on('task', tasks);
};
```

## Commands file
The extension provides multiple a command to make aql query. You can import the ones you need. Example `support/index.js` file.

```
import mariadb from 'cypress-maria-db';
mariadb.loadDBCommands();
```

## cypress.json
Your cypress.json specify the DB redentials under "env" key in the following format

    "env": {
        "db": {
            "host": "",
            "user": "",
            "password": "",
            "connectionLimit": 5
        }
    }

# Usage
## cy.sqlQuery(query, values)

Examples
```
cy.sqlQuery(`SELECT 'test'`).should('eq', 'test');

cy.sqlQuery(`INSERT INTO 'test' (column1, column2) VALUES (?,?)`, ["value1", "value2"])
    .its('affectedRows')
    .should('eq', 1);
```
Multiple queries can be processed in a following way
```
cy.sqlQuery([`SELECT 'test1'`,`SELECT 'test2'`]).then(resultSet => {
    ...
})
```