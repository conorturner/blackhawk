export declare interface Log {
    text: string;
    time: Date;
}

export declare interface ErrorLog extends Log {
    stack: string;
    details: any;
}


