import { HTTPException } from "hono/http-exception";
import app from "./app";
import { getEnv } from "./utils/env";
import { encodeToken } from "./utils/token";

app.get("/oauth/:code", async c=>{
    const { code } = c.req.param();
    if(!code) throw new HTTPException(400, { message: "code not specified" });
    const res = await fetch(
        "https://github.com/login/oauth/access_token", {
            method: "POST",
            body: JSON.stringify({ code,
                client_id: getEnv(c, "CLIENT_ID"),
                client_secret: getEnv(c, "CLIENT_SECRET"),
                redirect_uri: `${getEnv(c, "CLIENT")}/home`
            }),
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        }
    );
    if(!res.ok) throw new HTTPException(400, { message: "code invaild" });
    return c.text(await encodeToken(c,
        (await res.json()).access_token));
});
