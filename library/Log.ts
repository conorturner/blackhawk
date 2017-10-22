"use strict";

import {Grapple} from 'grapple-http';
import {Stream} from 'plumbum';
import {LogType} from '../types/LogType';

const grap = new Grapple();

export class Log {
    private stream: Stream<LogType>;

    constructor() {
        const stream = new Stream<LogType>();

        stream.forEach((item: LogType) => console.log(item));

        this.stream = stream;
    }

    log (log: LogType) : void {
        this.stream.push(log);
    }
}