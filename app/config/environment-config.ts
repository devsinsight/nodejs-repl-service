import { Config } from '../types/types';

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'development environment',
  version: '1.0.0',
  port: 3000,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
  settings.port = 80
}