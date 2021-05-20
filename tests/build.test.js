'use strict';
const expect = require('chai').expect;
const should = require('chai').should;
const sinon = require('sinon');
const Serverless = require('serverless/lib/Serverless');
const CLI = require('serverless/lib/classes/CLI');

const build = require('../build');


describe('build.js', () => {
    describe('#_run()', () => {
        it('should execute an async function', async () => {
            const callbackSpy = sinon.spy();
            build.contextObject = {
                done: callbackSpy
            };
            async function handler() {
                await new Promise((resolve) => setTimeout(resolve, 200));
                return 'async';
            }
            await build._run(handler, {});
            expect(callbackSpy.calledOnceWithExactly(null, 'async')).to.equal(true);
        });

        it('should handle errors in an async function', async () => {
            const callbackSpy = sinon.spy();
            const error = new Error();
            build.contextObject = {
                done: callbackSpy
            };
            async function handler() {
                throw error;
            }
            await build._run(handler, {});
            expect(callbackSpy.calledOnceWithExactly(error)).to.equal(true);
        });

        it('should execute a non-async function', (done) => {
            const callbackSpy = sinon.spy();
            build.contextObject = {
                done: callbackSpy
            };
            function handler(event, context, callback) {
                setTimeout(() => {
                    callback(null, 'callback');
                    expect(callbackSpy.calledOnceWithExactly(null, 'callback')).to.equal(true);
                    done();
                }, 200);
            }
            build._run(handler, {});
        });

        it('should handle errors in a non-async function', (done) => {
            const callbackSpy = sinon.spy();
            const error = new Error();
            build.contextObject = {
                done: callbackSpy
            };
            function handler(event, context, callback) {
                setTimeout(() => {
                    callback(error);
                    expect(callbackSpy.calledOnceWithExactly(error)).to.equal(true);
                    done();
                }, 200);
            }
            build._run(handler, {});
        });

        it('should execute a non-async function with nested promise', (done) => {
            const callbackSpy = sinon.spy();
            build.contextObject = {
                done: callbackSpy
            };
            function promise() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 200);
                });
            }
            function handler(event, context, callback) {
                promise().then(() => {
                    callback(null, 'promise');
                    expect(callbackSpy.calledOnceWithExactly(null, 'promise')).to.equal(true);
                    done();
                });
            }
            build._run(handler, {});
        });
        
        it.skip('should throw err - can not read property', (done) => {
            stepFunctionsOfflinePlugin.variables = {FirstLambda: 'firstLamda'};
            stepFunctionsOfflinePlugin.hooks[hooks.buildStepWorkFlow]()
                .then((res) => {
                    expect(res).to.be.an('undefined')
                })
                .catch((err) => {
                    expect(err).to.throw(/Cannot read property/);
                }).finally(done);
        });

        it.skip('should throw err - goody', (done) => {
            stepFunctionsOfflinePlugin.variables = {FirstLambda: 'firstLambda'};
            stepFunctionsOfflinePlugin.hooks[hooks.buildStepWorkFlow]()
                .then((res) => {
                console.log(111)
                })
                .catch((err) => {
                    console.log(222)

                }).finally(done);
        });

    });
});