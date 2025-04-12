import { Hono } from "hono";

const app = new Hono<{ Bindings: {
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CLIENT: string,
    SECRET: string
}}>();

export default app;
