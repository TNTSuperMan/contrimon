import { HTTPException } from "hono/http-exception";
import app from "./app";
import { encodeToken } from "./utils/token";

app.post("/oauth/:code", async c=>{
    const { code } = c.req.param();
    if(!code) throw new HTTPException(400, { message: "code not specified" });
    const res = await fetch(
        "https://github.com/login/oauth/access_token", {
            method: "POST",
            body: JSON.stringify({ code,
                client_id: c.env.PUBLIC_CLIENT_ID,
                client_secret: c.env.CLIENT_SECRET,
                redirect_uri: `${c.env.CLIENT}/home`
            }),
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        }
    );
    const json = await res.json();
    if(json.error)
        throw new HTTPException(400, {
            message: `OAuth error: ${JSON.stringify(json)}` });
    return c.text(await encodeToken(c,
        json.access_token));
});
