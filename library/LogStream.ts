"use strict";

import {Grapple} from 'grapple-http';
import {Stream} from 'plumbum';
import {Log, ErrorLog} from '../types/Log';

const grap = new Grapple();

export class LogStream {
    private stream: Stream<Log>;

    constructor() {
        const stream = new Stream<Log>();

        stream.forEach((item: Log) => console.log(item));

        this.stream = stream;
    }

    log (log: Log) : void {
        this.stream.push(log);
    }
}