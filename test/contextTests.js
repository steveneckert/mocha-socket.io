'use strict';

var chai = require('chai');
var should = chai.should();
var socketContext = require('../lib/index');

describe('socket creation', socketContext(function () {

    it('should create a socket', function (done) {
        var socket = this.attach(true);
        should.exist(socket);
        socket.on('connect', function () {
            done();
        });
        socket.on('error', done);
    });

}));

describe('socket connections', socketContext(function() {

    var managed;
    var socketClient;

    afterEach(function () {

        if (managed && socketClient.connected) {
            this.test.error(new Error('Managed socket still connected.'));
        }
    });

    describe('should close a managed socket', function() {

        it('should disconnect a managed socket', function(done) {
            socketClient = this.attach(true);
            socketClient.on('connect', function () {
                done();
            });
        });

    });

    describe('should not close an unmanaged socket', function() {

        it('should not disconnect a managed socket', function(done) {
            managed = false;
            socketClient = this.attach(false);
            socketClient.on('connect', function () {
                done();
            });
        });

    });

}));

