import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as _ from 'lodash';

import * as service from '../service/shift-cipher';

const encode = new Router();

encode.post( '/', 
    async (ctx: Koa.Context, next: () => Promise<any>) => {
        ctx.checkBody('Shift').notEmpty().isInt().ge(0).le(26);
        ctx.checkBody('Message').notEmpty();
        if (ctx.errors) {
            ctx.status = 400;
            ctx.body = ctx.errors;
            return;
        }
        await next();
    },
        async (ctx: Koa.Context, next: () => Promise<any>) => {
        const { Shift, Message } = ctx.request.body;
        try {
            const encodedMessage = service.shiftMessage(Message, Shift);
            ctx.body = { EncodedMessage: encodedMessage };
            ctx.status = 200;
        }
        catch (e) {
            ctx.body = { EncodedMessage: "" };
            ctx.status = 500;
            console.log( `Unable to encode message: [${Message}] Shift: [${Shift}]` )
        }
        
        await next();
    }
);

export default encode;