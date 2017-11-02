import { injectable } from 'inversify';
import { VmOptions } from "../vm-options-model";

const vm = require('vm');
const util = require('util');

@injectable()
export class EvaluationService implements IEvaluationService {

    public compileScript(code: string, opts?: VmOptions) {
        let context = this.createEvaluationContext({ console: console, setTimeout: setTimeout });
        return this.captureStdout(() => vm.runInNewContext(code, context, opts));
    }

    public executeScript(code: string, opts?: VmOptions) {
        let context = this.createEvaluationContext({ console: console, setTimeout: setTimeout });
        return vm.runInNewContext(code, context, opts);
    }

    private captureStdout(callback) {
        let output = '';
        let old_write = process.stdout.write;

        process.stdout.write = function (str: string, encoding?: string, cb?: Function) {
            output += str;
        }.bind(this);

        callback();

        process.stdout.write = old_write

        return output;
    }

    private createEvaluationContext(params: any) {
        return new vm.createContext(params);
    }
}

export interface IEvaluationService {
    executeScript(code: string, opts?: VmOptions): any;
    compileScript(code: string, opts?: VmOptions): any;
}