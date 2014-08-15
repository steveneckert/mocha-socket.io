'use strict';

var chai = require('chai');
var should = chai.should();
var socketContext = require('../lib/index');

describe('should inherit a socket context', socketContext(function() {

    it('should be true', function() {
        true.should.be.true;
    });

    describe('inner test context', function() {

        it('should be true', function(done) {
            var client = this.attach(true);
            client.on('connect', function() {
                true.should.be.true;
                done();
            });

        });

    });

}));
