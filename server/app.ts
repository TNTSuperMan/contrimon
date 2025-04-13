import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { getEnv } from "./utils/env";

const app = new Hono<{ Bindings: {
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string
}, Variables: JwtVariables<string>}>();

app.use("/user/*", async(c,n) => 
    jwt({ secret: getEnv(c, "SECRET") })(c, n));

export default app;
