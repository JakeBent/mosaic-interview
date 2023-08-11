import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import V1 from '@v1';
import Config from '@config';
import logger from '@logger';
import applyExec from '@common/middleware/exec';

export default class Server {
  public server: Express.Application;
  public config: Config;
  public v1: V1;

  constructor() {
    this.config = new Config();
    this.server = Express();
    this.v1 = new V1();
  }

  async register() {
    this.server.use(bodyParser.json());
    this.server.use(morgan('tiny'));
    this.server.use(applyExec);
    this.server.use(this.v1.prefix, this.v1.routes());
  }

  async start() {
    const {
      port,
      mongoUri,
    } = this.config;

    logger.info('connecting to mongo server...');
    await mongoose.connect(mongoUri);
    logger.success(`connected to mongo at ${mongoUri}`);

    logger.info('starting server...');
    this.server.listen({ port });
    logger.success(`started server on port ${port}`);
  }
}
