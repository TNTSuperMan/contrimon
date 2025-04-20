import type { Context } from "hono";
import { sign } from "hono/jwt";
import { getEnv } from "./env";
import { ModeOfOperation, utils } from "aes-js";

const key = (c: Context) =>
    new Uint8Array(
        getEnv(c, "ENC_SECRET").split("")
        .reduce<string[]>(((v,c,i)=>(i%2?v[v.length-1]+=c:v.push(c),v)),[])
        .map(e=>parseInt(e,16)));

export const encodeToken = (c: Context, token: string) =>
    sign({
        token: utils.hex.fromBytes(new ModeOfOperation.ctr(key(c)).encrypt(utils.utf8.toBytes(token)))
    }, getEnv(c, "SECRET"));
    
export const getToken = (c: Context) =>
    utils.utf8.fromBytes(
        new ModeOfOperation.ctr(key(c)).decrypt(
            utils.hex.toBytes(c.get("jwtPayload").token)
        )
    );
