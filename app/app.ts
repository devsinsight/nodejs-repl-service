import { settings } from './config/environment-config';
import { InversifyContainer } from './config/inversify-container';
import { RestifyApiConfig } from "./config/restify-api-config";

let configParams = {
  name: settings.name
}

export let api = InversifyContainer(configParams, RestifyApiConfig);

api.listen(settings.port)