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

app.get("/user/contributes", async c=>{
    const { token } = c.get("jwtPayload");
    const infores = await fetch(
        "https://api.github.com/user", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if(!infores.ok) throw new HTTPException(400, { message: "Failed to get user" });
    const info = await infores.json();

    const now = new Date();
    const todayBegin = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const res = await fetch(
        "https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({query:`
            query {
                user(login: "${info.name}") {
                    contributionsCollection(from: "${todayBegin.toISOString()}") {
                        totalCommitContributions
                        totalIssueContributions
                        totalPullRequestContributions
                        totalPullRequestReviewContributions
                        totalRepositoryContributions
                        contributionCalendar {
                            totalContributions
                        }
                    }
                }
            }
        `})
    })
    if(!res.ok){
        console.log(res.status, res.statusText);
        res.text().then(console.log);
        throw new HTTPException(400, { message: "Failed to get contributionCalendar" });
    }
    return c.json(await res.json());
})
