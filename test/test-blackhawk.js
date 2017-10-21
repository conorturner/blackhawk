"use strict";

const {should} = require("chai");
should();

const {BlackHawk, Wrap} = require("../build");


describe("Test", () => {

	it("Silence and continue with default", (done) => {
		const bh = new BlackHawk();

		Promise.resolve("A value i need later")
			.then(() => {

				return Promise.reject("Oh i broke something");

			})
			.catch(error => Wrap(error, () => bh.silence(error).continueWith("I did break but its ok, here's a default value.")))
			.then(result => {
				result.should.equal("I did break but its ok, here's a default value.");
				done();
			})

	});

	it("Simply take error, log it and reject it", (done) => {
		const bh = new BlackHawk();

		Promise.resolve("A value i need later")
			.then(() => {

				return Promise.reject("Oh i broke something");

			})
			.catch(Wrap)
			.catch(result => {
				result.should.equal("Oh i broke something");
				done();
			});

	});



});