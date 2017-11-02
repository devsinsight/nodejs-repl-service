import { Test } from "../test-model";
import { injectable } from "inversify";

const vows = require('vows');
const assert = require('assert');

@injectable()
export class TestService implements ITestService {

    async execTest(params: Test) {
        let suite = vows.describe(params.subject);
        
        let batchName = params.batchName;
        let featureTestName = params.featureTestName;

        await suite.addBatch({
            batchName: {
                topic: function () {
                    return params.func();
                },
                testName: function (result) {
                    assert[params.assertKey](result, params.expectedResult);
                }
            }
        }).run();

        return suite.results;
    }
}

export interface ITestService {
    execTest(params: Test): any;
}