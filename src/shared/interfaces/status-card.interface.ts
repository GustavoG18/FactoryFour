export interface ResponseFetch {
    success: boolean;
    message: string;
    hostname: string;
    time: number;
}
export interface ErrorFetch {
    message: string;
}