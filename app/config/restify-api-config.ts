import * as restify from 'restify';

export function RestifyApiConfig(api: restify.Server) {
        restify.CORS.ALLOW_HEADERS.push('authorization');
        api.use(restify.CORS());
        api.pre(restify.pre.sanitizePath());
        api.use(restify.acceptParser(api.acceptable));
        api.use(restify.bodyParser());
        api.use(restify.queryParser());
        api.use(restify.authorizationParser());
        api.use(restify.fullResponse());
        api.use(require('restify-pino-logger')());
}