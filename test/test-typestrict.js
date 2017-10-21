const {should} = require("chai");
should();

const {BlackHawk} = require("../build");


describe("Test", () => {

	it("Promises would be nice?", (done) => {
		const bh = new BlackHawk(10);

		bh.blackhawkDown().then(result => {
			console.log(result)
			done();
		});

	});

	it("Get google", (done) => {
		const bh = new BlackHawk(10);

		bh.getGoogle()
			.then(result => {
				console.log(result);
				done()
			})
			.catch(err => done(err));

	});

});