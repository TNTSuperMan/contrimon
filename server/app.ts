import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { type Env } from "./utils/env";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env, Variables: JwtVariables<{
    token: string
}>}>();

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
