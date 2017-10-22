export interface LogType {
    text: string;
    time: Date;
}

export interface ErrorLogType extends LogType {
    stack: string | undefined;
    details: any;
}

export interface DebugLogType extends LogType {
    object: any
}

