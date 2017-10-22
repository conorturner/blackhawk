"use strict";

const {should} = require("chai");
should();

const {Stream} = require("../build");


describe("TDD", () => {

	it.only("Silence and continue with default", (done) => {

		class PlusOneStream extends Stream {
			constructor() {
				super();
			}

			_transform (item) {
				return Promise.resolve(item + 1);
			}
		}

		const pws = new PlusOneStream(5);

		pws.write(1);

		done();

	});

});