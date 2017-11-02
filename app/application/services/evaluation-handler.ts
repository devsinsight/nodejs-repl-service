import { injectable, inject } from "inversify";
import { Test } from "../../domain/test-model";
import { IEvaluationService } from '../../domain/services/evaluation-service';
import { ITestService } from '../../domain/services/test-service';
import { VmOptions } from "../../domain/vm-options-model";

@injectable()
export class EvaluationHandler implements IEvaluationHandler {

    constructor(
        @inject('IEvaluationService') private evalService: IEvaluationService,
        @inject('ITestService') private testService: ITestService) { }

    compile(code: string, scriptFileName: string) {
        let vmOpts = this.setVmOptions(scriptFileName);
        return  this.evalService.compileScript(code, vmOpts);
    }

    public async evaluate(code: string, scriptFileName: string) {
        let vmOpts = this.setVmOptions(scriptFileName);
        let script = this.evalService.executeScript(code, vmOpts);

        let test = new Test();

        test.subject = 'BASIC TESTS';
        test.batchName = 'BASIC TEST 01';
        test.featureTestName = 'return hello world';
        test.assertKey = 'equal';
        test.expectedResult = 'hello world';
        test.parameters = null;
        test.func = ()=> { return script; };

        return await this.testService.execTest(test);
    }

    private setVmOptions(scriptFileName: string){
        let vmOpts = new VmOptions(scriptFileName);
        vmOpts.default();
        return vmOpts;
    }

}

export interface IEvaluationHandler {
    evaluate(code: string, scriptFileName: string);
    compile(code: string, scriptFileName: string);
}

