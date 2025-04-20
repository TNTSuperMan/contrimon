import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { getEnv } from "./utils/env";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: {
    PUBLIC_CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string,
    ENC_SECRET: string,
}, Variables: JwtVariables<{
    token: string
}>}>();

app.use("*", (c,n) => cors({
    origin: getEnv(c, "CLIENT"),
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-type", "Authorization"],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    credentials: true
})(c,n))

app.use("/user/*", async(c,n) => 
    jwt({ secret: getEnv(c, "SECRET")})(c, n));

export default app;
