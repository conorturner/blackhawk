export interface Log {
    text: string;
    time: Date;
}

export interface ErrorLog extends Log {
    stack: string | undefined;
    details: any;
}

export interface DebugLog extends Log {
    object: any
}

