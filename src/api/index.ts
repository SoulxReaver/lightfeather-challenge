import * as Router from 'koa-router';
import encode from './encode';

const api = new Router();

api.use('/encode', encode.routes());

export default api;