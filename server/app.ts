import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { cors } from "hono/cors";

type Env = {
    PUBLIC_CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string,
    ENC_SECRET: string,
}

export type HonoEnv = {
    Bindings: Env,
    Variables: JwtVariables<{
        token: string
}>}

const app = new Hono<HonoEnv>();

app.use("*", cors({
    origin: (origin, c) => c.env.CLIENT == origin ? origin : null,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-type", "Authorization"],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    credentials: true
}))

app.use("/user/*", async(c,n) => 
    jwt({ secret: c.env.SECRET})(c, n));

export default app;
