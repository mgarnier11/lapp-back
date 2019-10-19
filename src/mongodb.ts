// @ts-ignore
import { parseConnectionString as parse } from 'mongodb-core';
import { MongoClient } from 'mongodb';
import { Application } from './declarations';
import logger from './logger';
//const logger = require('./logger');

export default function(app: Application) {
  const config = app.get('mongodb');
  const promise = MongoClient.connect(config, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(client => {
      const dbName = parse(config, () => {});

      app.emit('ready');

      return client.db(dbName);
    })
    .catch(error => {
      logger.error(error);
    });

  app.set('mongoClient', promise);
}
