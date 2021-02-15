import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  };

  public async init(): Promise<void> {
    this.SetupExpress();
    this.SetupControllers();
    await this.databaseSetup();
  };

  private SetupExpress(): void {
    this.app.use(bodyParser.json());
  };

  private SetupControllers(): void {
    const forecastController = new ForecastController();

    this.addControllers([forecastController]);
  };

  private async databaseSetup(): Promise<void> {
    await database.connect();
  };

  public async close() {
    await database.close();
  }

  public GetApp(): Application {
    return this.app;
  };
}
