export interface ResponseFetch {
    success: boolean;
    message: string;
    hostname: string;
    time: number;
}
  
export interface StatusCardProps {
    apiName: string; 
    actionRefecth: boolean;
}

export interface ErrorFetch {
    message: string;
}