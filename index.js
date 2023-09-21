const proxylist = require('./proxies');
var database = require('./knexdb.js');

    (async () => {
        console.log("starting")
        let proxydata = await proxylist.getProxies()

        for (var index in proxydata) {
            database.insertProxy(proxydata[index].ipAddress + ':' + proxydata[index].port,proxydata[index].country)
        }
        // let proxyLink = proxydata[randomProxyNumber].ipAddress + ':' + proxydata[randomProxyNumber].port
        // console.log(proxyLink)
    })()