const mariadb = require('mariadb');

module.exports = (dbConfig) => {
    return {
        'sqlQuery:execute': async ({sql, values}) => {
            dbConfig.multipleStatements = true;
            let pool = mariadb.createPool(dbConfig);
            let queriesPool = Array.isArray(sql) ? sql.join(';') : sql;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query(queriesPool, values);
                return Promise.resolve(result);
            } catch (err) {
                return Promise.reject(err);
            } finally {
                pool.end();
                pool = null;
            }
        }
    }
};