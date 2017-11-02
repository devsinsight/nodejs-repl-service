export class VmOptions{
    id: number;
    filename: string;
    lineOffset: number;
    columnOffset: number;
    displayErrors: boolean;
    timeout: number;
    cachedData: Buffer;
    produceCachedData: boolean;

    constructor(filename: string){
        this.filename = filename;
    }

    default(){
        this.displayErrors = true;
        this.timeout = 1000;
    }
}