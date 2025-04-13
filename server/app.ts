import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { getEnv } from "./utils/env";

const app = new Hono<{ Bindings: {
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string
}, Variables: JwtVariables<string>}>();

app.use("*", async(c,n) => 
    c.req.path.startsWith("/oauth/") ?
        await n() :
        jwt({ secret: getEnv(c, "SECRET") })(c, n));

export default app;
