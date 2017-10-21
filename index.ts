import {Promise} from 'es6-promise';
import {LogStream} from './library/LogStream';
import {Log, ErrorLog} from './types/Log';

export class BlackHawk {
    private logStream: LogStream;

    constructor() {
        this.logStream = new LogStream();

    }

    continueWith(value: any): Promise<any> {
        return Promise.resolve(value);
    }

    silence(error: Error): BlackHawk {
        this.error("silenced", error);
        return this;
    }

    log (text: string) {
        const log: Log = {text, time: new Date()};
        this.logStream.log(log);
    }

    error (text: string, details: any) : void {
        const errorLog: ErrorLog = ({text, time: new Date(), details, stack: new Error().stack});
        this.logStream.log(errorLog);
    }
}

export function Wrap(error: any, handler: Function): Promise<any> {
    if (handler) return handler();
    else return Promise.reject(error);
}