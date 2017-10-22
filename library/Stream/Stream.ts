"use strict";

import {Promise} from 'es6-promise';

export abstract class Stream<T> {
    private buffer: Queue<T>;
    private _onWrite: Function;

    abstract _transform (item: T): Promise<T>;

    constructor(highWaterMark: number) {
        this.buffer = new Queue<T>(highWaterMark);
    }

    private push(item: T): boolean { // used from within transform
        return false;
    }

    private pushMany(items: Array<T>): boolean | Array<T> { // used from within transform
        return false;
    }

    write(item: T): boolean { // used externally to add data to the stream
        return this.buffer.push(item);
    }

    writeMany(items: Array<T>): boolean | Array<T> { // used externally to add data to the stream
        return items.reduce((acc, item) => {
            // seems a bit shit, should stop when it hits false
            if (!this.buffer.push(item)) acc.push(item);
            return acc;

        }, new Array<T>(0));
    }

    onWrite(eventHandler: Function): void {
        this._onWrite = (item: T) => {
            // Do some internal shit here
            eventHandler(item);
        };
    }


}

export class Queue<T> {
    private length: number;
    private data: Array<T>;

    constructor(length: number) {
        this.length = length;
        this.data = new Array<T>(0);
    }

    push(item: T): boolean {
        if (this.data.length > this.length - 1) return false;
        else {
            this.data.push(item);
            return true;
        }

    }

    pull(): T | null {
        if (this.data.length === 0) return null;
        return this.data.splice(0, 1)[0];
    }

}