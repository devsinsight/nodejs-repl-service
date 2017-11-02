import * as restify from 'restify';
import { BaseController } from "./base-controller";
import { Get, Post, Controller } from 'inversify-restify-utils';
import { inject } from "inversify";
import { IEvaluationHandler } from "../application/services/evaluation-handler";

@Controller('/api/evaluation')
export class EvaluationController extends BaseController {

    constructor( @inject('IEvaluationHandler') private handler: IEvaluationHandler) { super(); }

    @Post('/evaluate')
    private async evaluate(req: restify.Request) {
        let params = req.params || req.body;
        return await this.handler.evaluate(params.code, params.name);
    }

    @Post('/compile')
    private compile(req: restify.Request) {
        let params = req.params || req.body;        
        return { result: this.handler.compile(params.code, params.name) };
    }

}