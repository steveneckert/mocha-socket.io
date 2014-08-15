'use strict';

var chai = require('chai');
var should = chai.should();
var socketContext = require('../src/index');

describe('should inherit a socket context', socketContext(function () {

    it('should be true', function () {
        console.log('test1');
        true.should.be.true;
    });

    describe('inner test context', function () {

        it('should be true', function (done) {
            console.log('test2');

            var client = this.attach(true);
            client.on('connect', function () {
                true.should.be.true;
                done();
            });

        });

    });

}));