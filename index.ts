import {Promise} from 'es6-promise';

export class BlackHawk {
    private id: number;
    constructor(id: number) { this.id = id; }
    blackhawkDown () { return Promise.resolve("it works") }
    getId() {
        return this.id;
    }
}