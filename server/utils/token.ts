import type { Context } from "hono";
import { sign } from "hono/jwt";
import { getEnv } from "./env";
import { AES } from "crypto-js";

export const encodeToken = (c: Context, token: string) =>
    sign({
        token: AES.encrypt(token, getEnv(c, "ENC_SECRET")).toString()
    }, getEnv(c, "SECRET"));
    
export const getToken = (c: Context) =>
    String.fromCharCode(...
        AES.decrypt(
            c.get("jwtPayload").token,
            getEnv(c, "ENC_SECRET"))
        .toString()
        .split("")
        .reduce<string[]>(((v,c,i)=>(
            i % 2 ?
                v[v.length-1] += c :
                v.push(c),v
        )),[])
        .map(e=>parseInt(e,16)));
