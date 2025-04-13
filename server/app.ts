import { Hono } from "hono";
import { jwt } from "hono/jwt";

const app = new Hono<{ Bindings: {
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string
}}>();

app.use("*", async(c,n) => 
    c.req.path.startsWith("/oauth/") ?
        await n() :
        jwt({ secret: c.env.SECRET })(c, n));

export default app;
