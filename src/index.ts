import { SetupServer } from './server';
import config  from 'config';
import logger from './logger';
import { promises } from 'fs';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

// Abaixo segue alguns event lister do node sendo aplicados

// Escuta todas as promises caso uma dê erro e não tenha um catch, esse cara encerra a aplicação
process.on('unhandleRejection', (reason, promise) => {
  logger.error(`App exiting due to an unhamdled promise: ${promise} and reason ${reason}`);

  throw reason;
});

process.on('uncaughtExeption', (error) => {
  logger.error(`App exiting due to an uncaught exeption: ${error}`);
  process.exit(ExitStatus.Failure);
});

/* Um evento que fica escutando as solicitações
Por exemplo, o docker quando quer encerrar algum container,
ele manda uma mensagem para a aplicação se desligar, no caso abaixo,
criamos uma listener que fica escutando esse comandos caso haja
*/
(async (): Promise<void> => {
  try {    
    const server = new SetupServer(config.get('App.port'));
    server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) => {
      process.on((sig), async () => {
        try {
          await server.close();
          logger.info(`App exited with success`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    });
  } catch(error) {
    logger.error(`App exited with error ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();