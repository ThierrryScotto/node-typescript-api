import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';

export class SetupServer extends Server {

	constructor(private port = 3000) {
		super();
	};

	public init(): void {
		this.SetupExpress();
		this.SetupControllers();
	};

	private SetupExpress(): void {
		this.app.use(bodyParser.json());
	};

	public GetApp(): Application {
		return this.app;
	}

	private SetupControllers(): void {
		const forecastController = new ForecastController();
		
		this.addControllers([forecastController]);
	};
}