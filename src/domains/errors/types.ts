
export interface AError {
    errorCode: number;
    errorMessage: string;
}

export interface GuiError {
    message1: string;
    message2: string;
    icon: string;
    colorKey: string;
}

export interface AppError {
    code: number;
    msg: string;
    level?: string;
    originalException?: Error;
}

export interface PublicError {
    errorType: string;
    errorCode: number;
    errorMessage?: string;
    originalException?: Error;
}
