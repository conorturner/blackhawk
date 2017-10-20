const {should} = require("chai");
should();

describe("Test", () => {

	it("Private members oh joy", (done) => {
		const {BlackHawk} = require("../build");
		const bh = new BlackHawk(10);

		bh.getId().should.equal(10);

		done();
	});

	it("Promises would be nice?", (done) => {
		const {BlackHawk} = require("../build");
		const bh = new BlackHawk(10);

		bh.blackhawkDown().then(result => {
			console.log(result)
			done();
		});


	});

});