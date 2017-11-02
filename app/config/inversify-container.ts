import { Container } from 'inversify';
import "reflect-metadata";
import { interfaces, InversifyRestifyServer, TYPE } from 'inversify-restify-utils';
import { EvaluationController } from "../controllers/evaluation-controller";
import { BaseController } from "../controllers/base-controller";
import { IEvaluationService, EvaluationService } from "../domain/services/evaluation-service";
import { ITestService, TestService } from "../domain/services/test-service";
import { IEvaluationHandler, EvaluationHandler } from "../application/services/evaluation-handler";

export function InversifyContainer(opts?: any, config?: Function) {

    let container = new Container();

    // controllers: required
    container.bind<interfaces.Controller>(TYPE.Controller).to(BaseController).whenTargetNamed('BaseController');
    container.bind<interfaces.Controller>(TYPE.Controller).to(EvaluationController).whenTargetNamed('EvaluationController');

    //services
    container.bind<IEvaluationService>('IEvaluationService').to(EvaluationService);
    container.bind<ITestService>('ITestService').to(TestService);

    //command handler
    container.bind<IEvaluationHandler>('IEvaluationHandler').to(EvaluationHandler);

    // create server
    let server = new InversifyRestifyServer(container, opts);

    return server
        .setConfig((api) => config(api) )
        .build();
}


