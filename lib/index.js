'use strict';

var http = require('http').createServer(function () {
});
var io = require('socket.io')(http);
var client = require('socket.io-client');

exports = module.exports = function contextWrapper(testFn) {

    return function () {

        before(function () {
            http.listen(5000);

            var context = this;

            this.connections = [];
            this.io = io;
            this.attach = function (managed) {
                var connection = client('http://localhost:5000/', {
                    forceNew: 'true'
                });
                if (managed) {
                    context.connections.push(connection);
                }
                return connection;
            };
        });

        after(function () {
            io.engine.close();
            http.close();
        });

        beforeEach(function () {
        });

        afterEach(function () {
            this.connections.forEach(function (connection) {
                connection.io.disconnect();
            });
            this.connections.length = 0;
        });

        testFn();
    };


};
