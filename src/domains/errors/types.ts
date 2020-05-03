
export interface AError {
    errorCode: number;
    errorMessage: string;
}

export interface AnyIncomingError {
    isAxiosError?: boolean;
    response?: {
        status: number;
    } 
}

export interface GuiError {
    message1: string;
    message2: string;
    icon: string;
    colorKey: "disabled"|"normal"|"original"|"highlight"|"warning";
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
