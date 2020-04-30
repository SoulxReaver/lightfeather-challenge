import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as _ from 'lodash';

const encode = new Router();

// TODO: Remove me
encode.get( '/', async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.body = { message: "This is your GET route" };
    await next();
});

encode.post( '/', 
    async (ctx: Koa.Context, next: () => Promise<any>) => {
        ctx.checkBody('Shift').notEmpty().isInt();
        ctx.checkBody('Message').notEmpty();
        if (ctx.errors) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }
        await next();
    },
        async (ctx: Koa.Context, next: () => Promise<any>) => {
        
        ctx.body = { message: "This is your POST route, attached you can find the data you sent", body: ctx.request.body };
        await next();
    }
);

export default encode;