import {Promise} from 'es6-promise';
import {Grapple} from 'grapple-http';
import {Stream} from 'plumbum';

const grap = new Grapple();

export class BlackHawk {
    private id: number;
    constructor(id: number) { this.id = id; }
    blackhawkDown () { return Promise.resolve("it works") }
    getGoogle() : Promise<string> {
        return grap.get("http://www.google.com");
    }
}