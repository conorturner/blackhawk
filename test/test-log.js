"use strict";

const {should} = require("chai");
should();

const {Log} = require("../build");


describe("TDD", () => {

	it("Silence and continue with default", (done) => {
		const ls = new Log();

		console.log(ls);

		done();


	});

});