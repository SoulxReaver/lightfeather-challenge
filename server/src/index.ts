import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as Boom from 'boom';
import api from './api/index';
import * as validate from 'koa-validate';

const app       = new Koa();
const router    = new Router();
const PORT      = 23456;

validate(app);
/** Middlewares */
app.use( json() );
app.use( logger() );
app.use( bodyParser() );

/** Routes */
router.use( '/api', api.routes());
app.use( router.routes() );
app.use ( router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed()
  }));



app.listen( PORT, () => console.log( "Server started." ) );