import {Promise} from 'es6-promise';
import {Grapple} from 'grapple-http';
import {Stream} from 'plumbum';

const grap = new Grapple();

export class BlackHawk {
    private logStream: Stream<any>;

    constructor() {
        this.logStream = new Stream();

    }

    continueWith(value: any): Promise<any> {
        return Promise.resolve(value);
    }

    silence(error: Error): BlackHawk {
        console.log("Error silenced:", new Error().stack);
        return this;
    }
}

export function Wrap(error: any, handler: Function): Promise<any> {
    if (handler) return handler();
    else return Promise.reject(error);
}