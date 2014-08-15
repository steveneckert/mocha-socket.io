'use strict';

var io = require('socket.io')(5000);
var client = require('socket.io-client');

exports = module.exports = function contextWrapper(testFn) {

    return function () {

        before(function () {
            var context = this;

            this.connections = [];
            this.attach = function (managed) {
                var connection = client('http://localhost:5000/');
                if (managed) {
                    context.connections.push(connection);
                }
                return connection;
            };
        });

        after(function () {
            io.engine.close();
        });

        beforeEach(function () {
        });

        afterEach(function () {
            this.connections.forEach(function (connection) {
                connection.disconnect();
            });
            this.connections.length = 0;
        });

        testFn.call();
    };


};
