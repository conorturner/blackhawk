"use strict";

export class Stream<T> {
    private buffer: Queue<T>;

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
        return false;
    }

    writeMany(items: Array<T>): boolean | Array<T> { // used externally to add data to the stream
        return false;
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
        if(this.data.length > this.length - 1) return false;
        else {
            this.data.push(item);
            return false;
        }

    }

    pull(): T | null {
        if(this.data.length === 0) return null;
        return this.data.splice(0, 1)[0];
    }

}