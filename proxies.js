const ProxyLists = require('proxy-lists');

module.exports = {
    getProxies: function () {
        return new Promise((resolve, reject) => {
            let data = []

            ProxyLists.getProxies({
                // options
                countries: ['us','uk'],
                protocols:['https']

            })
                .on('data', function (proxies) {
                    // console.log('got some proxies');
                    // console.log(proxies)
                    if (data.length >= 100) {
                        resolve(data)
                    }
                    else {

                        for (var index in proxies) {
                            data.push(proxies[index])
                        }
                    }



                })
                .on('error', function (error) {
                    // Some error has occurred.
                    // console.log('error!', error);

                })
                .once('end', function () {

                    // Done getting proxies.
                    console.log('end!..done getting the proxies');
                    resolve(data);
                });
        })
    }
}