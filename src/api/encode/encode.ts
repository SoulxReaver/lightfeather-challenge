import * as Koa from 'koa';
import * as Router from 'koa-router';

import { EncodePostRequest, EncodePostResponse } from './encode.interface';

import * as service from '../../services/shift-cipher';

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
        async (ctx: Koa.Context, next: () => Promise<EncodePostResponse>) => {
        const { Shift, Message }: EncodePostRequest = ctx.request.body;
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