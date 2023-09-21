var connectionErrorHandler = function (connection, err) {
    if (connection && err && err.fatal) {
        if (connection.removedFromThePool)
            return;
        connection.removedFromThePool = true;
        knex.client.pool.genericPool.destroy(connection);
    }
};
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proxyengine',
        charset: 'utf8mb4'

    },
    pool: {
        min: 1, max: 7,
        afterCreate: function (connection, callback) {
            connection.on('error', connectionErrorHandler.bind(null, connection));
            connection.on('end', connectionErrorHandler.bind(null, connection));
            callback();
        }

    }
});

module.exports = {
    insertProxy: function (proxyLink, country) {

        //check if proxy exists first
        knex('proxies').where('proxyValue', proxyLink).then((results) => {
            if (results.length == 0) {

                knex('proxies').insert({ proxyValue: proxyLink, proxyCountry: country, timestamp: new Date().getTime() }).then((response) => {
                    console.log("inserted", proxyLink, "country", country)
                })
            }
            else (
                console.log("proxy exists")
            )
        })



    }
}