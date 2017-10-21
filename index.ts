import {Promise} from 'es6-promise';
import {Grapple} from './lib/grapple';

const grap = new Grapple();

export class BlackHawk {
    private id: number;
    constructor(id: number) { this.id = id; }
    blackhawkDown () { return Promise.resolve("it works") }
    getGoogle() {
        return grap.get("http://www.google.com");
    }
}