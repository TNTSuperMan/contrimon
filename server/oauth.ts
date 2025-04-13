import { HTTPException } from "hono/http-exception";
import app from "./app";

app.get("/oauth/:code", async c=>{
    const { code } = c.req.param();
    if(!code) throw new HTTPException(400, { message: "code not specified" });
    const res = await fetch(
        "https://github.com/login/oauth/access_token", {
            method: "POST",
            body: JSON.stringify({ code,
                client_id: c.env.CLIENT_ID,
                client_secret: c.env.CLIENT_SECRET,
                redirect_uri: `${c.env.CLIENT}/home`
            }),
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        }
    );
    if(!res.ok) throw new HTTPException(400, { message: "code invaild" });
    const { access_token } = await res.json();
    c.set("jwtPayload", access_token);
    
    return c.redirect(`${c.env.CLIENT}/home`);
});
