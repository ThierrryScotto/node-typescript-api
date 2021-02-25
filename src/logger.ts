import pino from 'pino';
import config from 'config';

export default pino({  //exporta uma classe que será intanciada somente uma vez (singleton)
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level'),
})