"use strict";

import {Promise} from 'es6-promise';

export abstract class Stream<T> {
    private highWaterMark: number;
    private bufferUse: number;
    private _onWrite: Function;
    private _onData: Function;
    private _onReady: Function;
    private transformPromise: Promise<T>;

    private consumers: Array<Stream<T>;

    abstract _transform(item: T): Promise<T>;

    constructor(highWaterMark: number) {
        this.highWaterMark = highWaterMark;
        this.bufferUse = 0;
        this.transformPromise = new Promise<T>((resolve => resolve()));

        this.consumers = new Array<Stream<T>>(0);

        // Initialize default functions, probs shit
        this.onData(() => {});
        this.onWrite(() => {});
        this.onReady(() => {});
    }

    private push(item: T): boolean { // used from within transform
        return false;
    }

    private pushMany(items: Array<T>): boolean | Array<T> { // used from within transform
        return false;
    }

    pipe (consumer: Stream<T>){
        this.consumers.push(consumer);
    }

    write(item: T): boolean { // used externally to add data to the stream
        if (this.bufferUse === this.highWaterMark) return false;

        this.bufferUse++;
        this.transformPromise.then(() => this._transform(item)
            .then((data) => {
                //TODO: write to the next thing
                return this._onData(data) // this wont return until the consumer has accepted it
                    .then(() => {
                        this.bufferUse--;
                        this._onReady(); // trigger the next item to come in
                    });
            }));

        return true;
    }

    writeMany(items: Array<T>): boolean | Array<T> { // used externally to add data to the stream
        return items.reduce((acc, item) => {
            // seems a bit shit, should stop when it hits false
            if (!this.write(item)) acc.push(item);
            return acc;

        }, new Array<T>(0)); // returns the items that didn't get added
    }

    onWrite(eventHandler: Function): void {
        this._onWrite = (item: T) => {
            // maybe Do some internal shit here
            eventHandler(item);
        };
    }

    onData(eventHandler: Function): void {
        this._onData = (item: T) => {
            eventHandler(item); // for user event handler

            const tryWrite = (consumer: Stream<T>, item: T, resolve: Function) =>
                !consumer.write(item) ? consumer.onReady(() => tryWrite(consumer, item, resolve)) : resolve();

            const promises = this.consumers.map(consumer => {
                return new Promise<T>((resolve) => tryWrite(consumer, item, resolve))
            });

            Promise.all(promises)
                .then(() => {
                    this._onReady(); // Only call on ready when all consumers have accepted the write
                });
        };
    }

    onReady(eventHandler: Function): void {
        this._onReady = (item: T) => {
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