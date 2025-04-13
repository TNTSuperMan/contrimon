import { HTTPException } from "hono/http-exception";
import app from "./app";

app.get("/user/info", async c=>{
    const { token } = c.get("jwtPayload");
    const res = await fetch(
        "https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if(!res.ok) throw new HTTPException(400, { message: "Failed to get user" });
    return c.json(await res.json());
});
