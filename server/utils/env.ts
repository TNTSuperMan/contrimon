import type { Context } from "hono";

export const getEnv = (c: Context, name: string) =>
    process.isBun ? process.env[name] : c.env[name];