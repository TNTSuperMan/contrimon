import type { Context } from "hono";

export type Env = {
    PUBLIC_CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string,
    ENC_SECRET: string,
}

export const getEnv = (c: Context, name: string) =>
    process.isBun ? process.env[name] : c.env[name];