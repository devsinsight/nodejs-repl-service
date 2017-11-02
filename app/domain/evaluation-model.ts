import { VmOptions } from "./vm-options-model";
import { Test } from "./test-model";

export class Evaluation {
    
    id: number;
    scriptOptions: VmOptions;
    code: string;

    constructor(code: string, scriptFileName: string) {
        this.code = code;
        this.scriptOptions = new VmOptions(scriptFileName);
        this.scriptOptions.default();
    }

}