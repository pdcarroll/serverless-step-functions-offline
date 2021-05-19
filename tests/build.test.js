'use strict';
const expect = require('chai').expect;
const should = require('chai').should;
const sinon = require('sinon');
const Serverless = require('serverless/lib/Serverless');
const CLI = require('serverless/lib/classes/CLI');

const build = require('../build');


describe.only('build.js', () => {
    describe('#_run()', () => {
        it('should execute an async function', async () => {
            const callbackSpy = sinon.spy();
            build.contextObject = {
                done: callbackSpy
            };
            async function handler(event, context, callback) {
                await new Promise((resolve) => setTimeout(resolve, 200));
                callback();
            }
            await build._run(handler, {});
            expect(callbackSpy.calledOnce).to.equal(true);
        });

        it('should execute a non-async function', () => {
            const callbackSpy = sinon.spy();
            build.contextObject = {
                done: callbackSpy
            };
            function handler(event, context, callback) {
                return callback();
            }
            build._run(handler, {});
            expect(callbackSpy.calledOnce).to.equal(true);
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