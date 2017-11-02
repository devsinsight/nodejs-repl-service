import * as restify from 'restify';
import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';

@injectable()
export class BaseController implements interfaces.Controller{

	constructor() {}
    
}